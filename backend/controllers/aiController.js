const aiService = require('../services/aiService');
const Chat = require('../../database/models/Chat');

const generateRoadmap = async (req, res) => {
  try {
    const { goal } = req.body;
    if (typeof goal !== 'string' || goal.trim().length < 5) {
      return res.status(400).json({ success: false, message: 'Please provide a valid goal (at least 5 characters)' });
    }

    const roadmap = await aiService.generateRoadmap(goal.trim());
    res.json({ success: true, roadmap });
  } catch (error) {
    console.error('AI roadmap generation error:', error);
    res.status(error.statusCode || 500).json({ success: false, message: error.statusCode === 503 ? error.message : 'Failed to generate roadmap' });
  }
};

const analyzeSkills = async (req, res) => {
  try {
    const { skills } = req.body;
    if (typeof skills !== 'string' || skills.trim().length < 5) {
      return res.status(400).json({ success: false, message: 'Please describe your skills (at least 5 characters)' });
    }

    const analysis = await aiService.analyzeSkills(skills.trim());
    res.json({ success: true, analysis });
  } catch (error) {
    console.error('AI skill analysis error:', error);
    res.status(error.statusCode || 500).json({ success: false, message: error.statusCode === 503 ? error.message : 'Failed to analyze skills' });
  }
};

const chat = async (req, res) => {
  try {
    const { message } = req.body;
    if (typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Message cannot be empty' });
    }

    // Get or create chat record for this user
    let chatRecord = await Chat.findOne({ userId: req.user._id });
    if (!chatRecord) {
      chatRecord = new Chat({ userId: req.user._id, messages: [] });
    }

    const userMessage = { role: 'user', content: message.trim() };
    chatRecord.messages.push(userMessage);

    // Get recent history for context (last 10 messages)
    const history = chatRecord.messages.slice(-11, -1);
    const aiReply = await aiService.chatResponse(message.trim(), history);

    const assistantMessage = { role: 'assistant', content: aiReply };
    chatRecord.messages.push(assistantMessage);

    // Keep only last 100 messages to avoid bloat
    if (chatRecord.messages.length > 100) {
      chatRecord.messages = chatRecord.messages.slice(-100);
    }

    await chatRecord.save();

    res.json({
      success: true,
      reply: aiReply,
      message: assistantMessage
    });
  } catch (error) {
    console.error('AI chat error:', error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode === 503 ? error.message : 'Failed to get AI response'
    });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const chatRecord = await Chat.findOne({ userId: req.user._id });
    const messages = chatRecord ? chatRecord.messages.slice(-50) : [];
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get chat history' });
  }
};

const clearChatHistory = async (req, res) => {
  try {
    await Chat.findOneAndUpdate(
      { userId: req.user._id },
      { messages: [] },
      { upsert: true }
    );
    res.json({ success: true, message: 'Chat history cleared' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to clear chat history' });
  }
};

module.exports = { generateRoadmap, analyzeSkills, chat, getChatHistory, clearChatHistory };
