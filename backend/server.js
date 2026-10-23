const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('../database/config/db');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', process.env.CLIENT_URL].filter(Boolean),
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/roadmaps', require('./routes/roadmaps'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/user', require('./routes/user'));

app.get('/', (req, res) => {
  res.json({ message: 'EduPath Navigator API is running!', version: '1.0.0' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
connectDB().then(async () => {
  await require('./controllers/roadmapController').seedRoadmaps();
  app.listen(PORT, () => {
  console.log(`\n🚀 EduPath Navigator Server running on port ${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error(`Backend startup failed: ${error.message}`);
  process.exitCode = 1;
});
