import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseMarkdown } from '../src/utils/helpers.js'
import { buildNotifications } from '../src/utils/notifications.js'

test('AI markdown escapes executable HTML, including fenced code', () => {
  for (const input of ['<img src=x onerror=alert(1)>', '<script>alert(1)</script>', '<svg onload=alert(1)>', '```html\n<img src=x onerror=alert(1)>\n```']) {
    const html = parseMarkdown(input)
    assert.doesNotMatch(html, /<(img|script|svg)\b/i)
    assert.match(html, /&lt;/)
  }
  assert.match(parseMarkdown('**Safe**'), /<strong>Safe<\/strong>/)
  assert.match(parseMarkdown('```js\nconst x = 1 < 2;\n```'), /<pre><code>const x = 1 &lt; 2;/)
})

test('notifications use actual completed skills and change when progress changes', () => {
  const user = { _id: 'user1', createdAt: '2026-01-01' }
  const careers = [{ id: 'web', title: 'Web', totalSkills: 3 }]
  assert.equal(buildNotifications(user, {}, careers).length, 1)
  const first = buildNotifications(user, { web: { roadmapId: 'web', completedSkills: ['html'], totalSkills: 3, updatedAt: '2026-02-01' } }, careers)[0]
  assert.equal(first.message, '1 of 3 skills completed. 2 remaining.')
  const done = buildNotifications(user, { web: { roadmapId: 'web', completedSkills: ['html', 'css', 'js'], totalSkills: 3, updatedAt: '2026-03-01' } }, careers)[0]
  assert.equal(done.kind, 'complete')
  assert.notEqual(first.id, done.id)
  assert.deepEqual(buildNotifications(null, {}, careers), [])
})
