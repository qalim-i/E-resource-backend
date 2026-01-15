const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { resources } = require('../mockData');

// Get resources for a student
router.get('/student/:id', protect, (req, res) => {
  const studentResources = resources.filter(r => r.studentId === req.params.id);
  res.status(200).json({ success: true, data: studentResources });
});

module.exports = router;