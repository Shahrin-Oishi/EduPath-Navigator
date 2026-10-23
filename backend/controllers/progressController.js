const Progress = require('../../database/models/Progress');
const Roadmap = require('../../database/models/Roadmap');
const User = require('../../database/models/User');

const getUserProgress = async (req, res) => {
  try {
    const progressRecords = await Progress.find({ userId: req.user._id });
    res.json({ success: true, progress: progressRecords });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch progress' });
  }
};

const updateProgress = async (req, res) => {
  try {
    const { roadmapId, skillId, completed, totalSkills } = req.body;

    if (!roadmapId || !skillId) {
      return res.status(400).json({ success: false, message: 'roadmapId and skillId are required' });
    }

    let progress = await Progress.findOne({ userId: req.user._id, roadmapId });

    if (!progress) {
      progress = new Progress({
        userId: req.user._id,
        roadmapId,
        completedSkills: [],
        totalSkills: totalSkills || 0
      });
    }

    if (completed) {
      if (!progress.completedSkills.includes(skillId)) {
        progress.completedSkills.push(skillId);
      }
    } else {
      progress.completedSkills = progress.completedSkills.filter(id => id !== skillId);
    }

    if (totalSkills) progress.totalSkills = totalSkills;

    const total = progress.totalSkills || 1;
    progress.progressPercentage = Math.round((progress.completedSkills.length / total) * 100);

    await progress.save();

    // Update user's selected career path if not set
    if (!req.user.selectedCareerPath) {
      await User.findByIdAndUpdate(req.user._id, { selectedCareerPath: roadmapId });
    }

    res.json({
      success: true,
      message: 'Progress updated',
      progress
    });
  } catch (error) {
    console.error('Progress update error:', error);
    res.status(500).json({ success: false, message: 'Failed to update progress' });
  }
};

const resetProgress = async (req, res) => {
  try {
    const { roadmapId } = req.body;

    if (roadmapId) {
      await Progress.findOneAndDelete({ userId: req.user._id, roadmapId });
    } else {
      await Progress.deleteMany({ userId: req.user._id });
    }

    res.json({ success: true, message: 'Progress reset successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to reset progress' });
  }
};

module.exports = { getUserProgress, updateProgress, resetProgress };
