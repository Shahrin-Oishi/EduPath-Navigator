const User = require('../../database/models/User');
const Progress = require('../../database/models/Progress');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    const progressRecords = await Progress.find({ userId: req.user._id });

    const totalCompleted = progressRecords.reduce((sum, p) => sum + p.completedSkills.length, 0);
    const totalSkills = progressRecords.reduce((sum, p) => sum + (p.totalSkills || 0), 0);

    res.json({
      success: true,
      user,
      stats: {
        totalCompleted,
        totalSkills,
        roadmapsStarted: progressRecords.length,
        overallProgress: totalSkills > 0 ? Math.round((totalCompleted / totalSkills) * 100) : 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, bio, selectedCareerPath } = req.body;
    const updates = {};

    if (name) updates.name = name.trim();
    if (bio !== undefined) updates.bio = bio.trim();
    if (selectedCareerPath !== undefined) updates.selectedCareerPath = selectedCareerPath;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ success: true, message: 'Profile updated', user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
};

module.exports = { getProfile, updateProfile };
