const express = require('express');
const router = express.Router();
const { getUserProgress, updateProgress, resetProgress } = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getUserProgress);
router.post('/update', protect, updateProgress);
router.delete('/reset', protect, resetProgress);

module.exports = router;
