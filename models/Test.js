const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject'],
    trim: true
  },
  marks: {
    type: Number,
    required: [true, 'Please add marks'],
    min: 0,
    max: 100
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Test', TestSchema);