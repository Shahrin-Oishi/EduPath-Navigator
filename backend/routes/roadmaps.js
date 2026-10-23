const express = require('express');
const router = express.Router();
const { getAllRoadmaps, getRoadmapById } = require('../controllers/roadmapController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getAllRoadmaps);
router.get('/:id', protect, getRoadmapById);

module.exports = router;
