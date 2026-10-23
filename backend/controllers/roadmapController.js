const Roadmap = require('../../database/models/Roadmap');
const roadmapsData = require('../../database/data/roadmaps');

// Seed roadmaps into DB if empty
const seedRoadmaps = async () => {
  const count = await Roadmap.countDocuments();
  if (count === 0) {
    await Roadmap.insertMany(roadmapsData);
    console.log('✅ Roadmaps seeded into database');
  }
};

// The server seeds roadmaps after the database connection is ready.

const getAllRoadmaps = async (req, res) => {
  try {
    const term = typeof req.query.q === 'string' ? req.query.q.trim().slice(0, 200) : '';
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const filter = term ? { $or: ['title', 'description', 'jobRoles', 'levels.skills.name', 'levels.skills.description'].map(field => ({ [field]: { $regex: escaped, $options: 'i' } })) } : {};
    const roadmaps = await Roadmap.find(filter, 'id title category description icon color gradient estimatedDuration jobRoles totalSkills');
    res.json({ success: true, roadmaps });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch roadmaps' });
  }
};

const getRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ id: req.params.id });
    if (!roadmap) {
      return res.status(404).json({ success: false, message: 'Roadmap not found' });
    }
    res.json({ success: true, roadmap });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch roadmap' });
  }
};

module.exports = { getAllRoadmaps, getRoadmapById, seedRoadmaps };
