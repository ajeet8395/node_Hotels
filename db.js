const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // force exit if failed
  });

const db = mongoose.connection;

db.on('disconnected', () => {
  console.log('❌ Disconnected from MongoDB');
});

module.exports = db;