const { test } = require('node:test');
const assert = require('node:assert/strict');
const groqPath = require.resolve('groq-sdk');
const originalGroq = require(groqPath);
let complete;
require.cache[groqPath].exports = class FakeGroq {
  constructor() {
    this.chat = { completions: { create: request => complete(request) } };
  }
};
const { chatResponse, generateRoadmap, analyzeSkills } = require('../services/aiService');

test('chat sends the current question and ordered conversation to a live-model adapter', async () => {
  const oldEnv = { ...process.env };
  try {
    process.env.GROQ_API_KEY = 'test-key';
    delete process.env.GROQ_MODEL;
    process.env.OPENAI_API_KEY = '';
    const requests = [];
    complete = async request => {
      requests.push(request);
      return { choices: [{ message: { content: `Answer to: ${request.messages.at(-1).content}` } }] };
    };
    const history = [{ role: 'user', content: 'I know HTML, CSS and JavaScript.' }, { role: 'assistant', content: 'Try frontend development.' }];
    const first = await chatResponse('Which framework should I learn next?', history);
    const second = await chatResponse('What is a Python list?');
    assert.notEqual(first, second);
    assert.equal(requests[0].model, 'openai/gpt-oss-120b');
    assert.deepEqual(requests[0].messages.slice(1, -1), history);
    assert.equal(requests[0].messages.at(-1).content, 'Which framework should I learn next?');
    assert.match(requests[0].messages[0].content, /Bengali/);
    process.env.GROQ_MODEL = 'configured-model';
    await chatResponse('Follow-up');
    assert.equal(requests.at(-1).model, 'configured-model');
  } finally {
    process.env = oldEnv;
  }
});

test('provider errors, empty responses, and missing keys never produce canned chat answers', async () => {
  const oldEnv = { ...process.env };
  try {
    process.env.GROQ_API_KEY = 'test-key';
    process.env.OPENAI_API_KEY = '';
    complete = async () => { throw Object.assign(new Error('Unavailable'), { status: 429 }); };
    await assert.rejects(chatResponse('Explain recursion'), { statusCode: 503 });
    await assert.rejects(generateRoadmap('Learn React'), { statusCode: 503 });
    await assert.rejects(analyzeSkills('Python and SQL'), { statusCode: 503 });
    complete = async () => ({ choices: [{ message: { content: ' ' } }] });
    await assert.rejects(chatResponse('Explain recursion'), { statusCode: 503 });
    process.env.GROQ_API_KEY = 'your_groq_api_key_here';
    await assert.rejects(chatResponse('Explain recursion'), { statusCode: 503 });
  } finally {
    process.env = oldEnv;
    require.cache[groqPath].exports = originalGroq;
  }
});

test('roadmap and skill controllers report unavailable AI as HTTP 503', async () => {
  const oldEnv = { ...process.env };
  try {
    process.env.GROQ_API_KEY = '';
    process.env.OPENAI_API_KEY = '';
    const controller = require('../controllers/aiController');
    for (const [handler, body] of [[controller.generateRoadmap, { goal: 'Learn React' }], [controller.analyzeSkills, { skills: 'Python and SQL' }]]) {
      let status, data;
      await handler({ body }, { status(code) { status = code; return this; }, json(value) { data = value; } });
      assert.equal(status, 503);
      assert.equal(data.success, false);
      assert.match(data.message, /temporarily unavailable/);
    }
  } finally { process.env = oldEnv; }
});
