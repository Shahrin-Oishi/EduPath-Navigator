const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  roadmapId: {
    type: String,
    required: true
  },
  completedSkills: {
    type: [String],
    default: []
  },
  progressPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  totalSkills: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

progressSchema.index({ userId: 1, roadmapId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);
