const User = require('../models/User');
const Test = require('../models/Test');

// @desc    Get all students
// @route   GET /api/students
// @access  Private/Teacher
exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' });
    res.status(200).json({ success: true, count: students.length, data: students });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get student tests
// @route   GET /api/students/:id/tests
// @access  Private
exports.getStudentTests = async (req, res) => {
  try {
    // Check if user is authorized to view these tests
    if (req.user.role === 'student' && req.user.id !== req.params.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to access other student\'s tests' 
      });
    }

    const tests = await Test.find({ studentId: req.params.id });
    res.status(200).json({ success: true, count: tests.length, data: tests });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Add test record
// @route   POST /api/students/:id/tests
// @access  Private/Teacher
exports.addTest = async (req, res) => {
  try {
    req.body.studentId = req.params.id;
    
    const test = await Test.create(req.body);
    res.status(201).json({ success: true, data: test });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Update test record
// @route   PUT /api/tests/:id
// @access  Private/Teacher
exports.updateTest = async (req, res) => {
  try {
    let test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    test = await Test.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: test });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete test record
// @route   DELETE /api/tests/:id
// @access  Private/Teacher
exports.deleteTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    await test.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};