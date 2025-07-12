const mongoose = require('mongoose');

//define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'; // Replace 'hotels' with your database name

// Setup the connection to MongoDB
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Get the default connection
// Monggose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;


// Define event listeners for the database connection
db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

// Export the database connection
module.exports = db;