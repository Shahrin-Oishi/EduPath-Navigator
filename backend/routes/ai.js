const express = require('express');
const router = express.Router();
const {
  generateRoadmap,
  analyzeSkills,
  chat,
  getChatHistory,
  clearChatHistory
} = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.post('/generate-roadmap', protect, generateRoadmap);
router.post('/skill-analyze', protect, analyzeSkills);
router.post('/chat', protect, chat);
router.get('/chat/history', protect, getChatHistory);
router.delete('/chat/history', protect, clearChatHistory);

module.exports = router;
