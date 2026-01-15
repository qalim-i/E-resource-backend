const bcrypt = require('bcryptjs');

// Mock users data
const users = [
  {
    id: '1',
    name: 'John Teacher',
    email: 'teacher@example.com',
    password: bcrypt.hashSync('password123', 10),
    role: 'teacher'
  },
  {
    id: '2',
    name: 'Jane Student',
    email: 'student@example.com',
    password: bcrypt.hashSync('password123', 10),
    role: 'student'
  }
];

// Mock students data
const students = [
  {
    id: '2',
    name: 'Jane Student',
    email: 'student@example.com',
    grade: '10th',
    subjects: ['Math', 'Science', 'English'],
    testResults: [
      { subject: 'Math', score: 85, date: '2023-01-15' },
      { subject: 'Science', score: 92, date: '2023-01-20' },
      { subject: 'English', score: 78, date: '2023-01-25' }
    ]
  },
  {
    id: '3',
    name: 'Mike Student',
    email: 'mike@example.com',
    grade: '10th',
    subjects: ['Math', 'Science', 'History'],
    testResults: [
      { subject: 'Math', score: 75, date: '2023-01-15' },
      { subject: 'Science', score: 88, date: '2023-01-20' },
      { subject: 'History', score: 82, date: '2023-01-25' }
    ]
  }
];

// Mock resources data
const resources = [
  {
    id: '1',
    title: 'Math Practice Problems',
    description: 'Additional practice problems for algebra',
    url: 'https://example.com/math-practice',
    subject: 'Math',
    studentId: '2'
  },
  {
    id: '2',
    title: 'Science Lab Guide',
    description: 'Guide for upcoming science lab experiments',
    url: 'https://example.com/science-lab',
    subject: 'Science',
    studentId: '2'
  }
];

module.exports = { users, students, resources };