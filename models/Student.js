const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  ciaScores: [Number],
  remarks: String,
  recommendedNotes: [String]
});

module.exports = mongoose.model('Student', studentSchema);