const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  estimatedTime: String,
  resources: [{ title: String, url: String, type: String }]
}, { _id: false });

const levelSchema = new mongoose.Schema({
  name: String,
  order: Number,
  color: String,
  skills: [skillSchema]
}, { _id: false });

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  difficulty: String,
  skills: [String]
}, { _id: false });

const roadmapSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  category: String,
  description: String,
  icon: String,
  color: String,
  gradient: String,
  levels: [levelSchema],
  projects: [projectSchema],
  totalSkills: { type: Number, default: 0 },
  estimatedDuration: String,
  jobRoles: [String]
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', roadmapSchema);
