const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://localhost:27017/edupath-navigator',
      { serverSelectionTimeoutMS: 10000, connectTimeoutMS: 10000 }
    );
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    throw error;
  }
};

connectDB.isConnected = () => mongoose.connection.readyState === 1;
module.exports = connectDB;
