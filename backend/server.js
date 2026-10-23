const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const connectDB = require('../database/config/db');

dotenv.config({ path: path.join(__dirname, '.env') });

const production = process.env.NODE_ENV === 'production';
if (production && (!process.env.MONGO_URI || !process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32)) {
  throw new Error('Production requires MONGO_URI and a private JWT_SECRET of at least 32 characters.');
}

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

app.get('/api/health', (req, res) => {
  const ready = connectDB.isConnected();
  res.status(ready ? 200 : 503).json({ success: ready, database: ready ? 'connected' : 'unavailable' });
});

app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint not found' });
});

if (production) {
  const clientDirectory = path.resolve(__dirname, '../frontend/dist');
  if (!fs.existsSync(path.join(clientDirectory, 'index.html'))) {
    throw new Error('Frontend build missing. Run the production build before starting.');
  }
  app.use(express.static(clientDirectory, { index: false }));
  app.get('*', (req, res) => res.sendFile(path.join(clientDirectory, 'index.html')));
} else {
  app.get('/', (req, res) => {
    res.json({ message: 'EduPath Navigator API is running!', version: '1.0.0' });
  });
}

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
