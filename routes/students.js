const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { students } = require('../mockData');

// Get all students (for teachers)
router.get('/', protect, (req, res) => {
  // Only allow teachers to access all students
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ success: false, message: 'Not authorized' });
  }
  
  res.status(200).json({ success: true, data: students });
});

// Get student by ID
router.get('/:id', protect, (req, res) => {
  const student = students.find(s => s.id === req.params.id);
  
  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }
  
  // Teachers can access any student, students can only access their own data
  if (req.user.role === 'student' && req.user.id !== student.id) {
    return res.status(403).json({ success: false, message: 'Not authorized' });
  }
  
  res.status(200).json({ success: true, data: student });
});

module.exports = router;