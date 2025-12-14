const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Student = require('./models/Student');

dotenv.config();

const sampleStudents = [
  {
    name: "Alice Johnson",
    rollNumber: "CSE001",
    ciaScores: [18, 22, 20],
    remarks: "Good progress",
    recommendedNotes: ["https://notion.so/dbms-notes", "https://example.com/data-structures"]
  },
  {
    name: "Bob Lee",
    rollNumber: "CSE002",
    ciaScores: [15, 17, 19],
    remarks: "Needs improvement in algorithms",
    recommendedNotes: ["https://example.com/algorithms", "https://notion.so/time-complexity"]
  },
  {
    name: "Charlie Brown",
    rollNumber: "CSE003",
    ciaScores: [20, 20, 20],
    remarks: "Very consistent performance.",
    recommendedNotes: []
  },
  {
    name: "Diana Prince",
    rollNumber: "CSE004",
    ciaScores: [25, 24, 25],
    remarks: "Excellent student.",
    recommendedNotes: []
  },
  {
    name: "Eve Adams",
    rollNumber: "CSE005",
    ciaScores: [12, 15, 14],
    remarks: "Struggling with the basics.",
    recommendedNotes: ["https://example.com/basics"]
  },
  {
    name: "Frank Miller",
    rollNumber: "CSE006",
    ciaScores: [22, 23, 24],
    remarks: "Shows great potential.",
    recommendedNotes: []
  },
  {
    name: "Grace Hopper",
    rollNumber: "CSE007",
    ciaScores: [25, 25, 25],
    remarks: "A true leader in the making.",
    recommendedNotes: []
  }
];

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await Student.deleteMany({});
  await Student.insertMany(sampleStudents);

  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDB();