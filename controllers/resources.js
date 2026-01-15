const Resource = require('../models/Resource');

// @desc    Get resources for a student
// @route   GET /api/students/:id/resources
// @access  Private
exports.getStudentResources = async (req, res) => {
  try {
    // Check if user is authorized to view these resources
    if (req.user.role === 'student' && req.user.id !== req.params.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to access other student\'s resources' 
      });
    }

    const resources = await Resource.find({ studentId: req.params.id })
      .populate('recommendedBy', 'name');
      
    res.status(200).json({ success: true, count: resources.length, data: resources });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Add resource recommendation
// @route   POST /api/students/:id/resources
// @access  Private/Teacher
exports.addResource = async (req, res) => {
  try {
    req.body.studentId = req.params.id;
    req.body.recommendedBy = req.user.id;
    
    const resource = await Resource.create(req.body);
    res.status(201).json({ success: true, data: resource });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};