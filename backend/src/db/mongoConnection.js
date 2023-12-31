const mongoose = require('mongoose');

async function main() {
  try {
    await mongoose.connect('mongodb+srv://shreyank23:dRFHu4I5INKWeIoK@cluster0.z94pqzc.mongodb.net/todoApplication');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); 
  }
}
module.exports = main;