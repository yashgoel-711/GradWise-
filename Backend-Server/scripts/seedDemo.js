// Creates (or resets) a demo student with realistic data for presentations.
// Run from Backend-Server:  node --env-file=.env scripts/seedDemo.js
import mongoose from "mongoose";
import { Student } from "../src/models/Student.model.js";
import { Project } from "../src/models/Project.model.js";
import { Course } from "../src/models/Course.model.js";
import { Academic } from "../src/models/Academic.model.js";
import { Certification } from "../src/models/Certification.model.js";

const DEMO_EMAIL = "demo@gradwise.com";
const DEMO_PASSWORD = "Demo@1234";

const GRADE_POINTS = { O: 10, "A+": 10, A: 9, "B+": 8, B: 7, C: 6, D: 5, F: 0 };
const semester = (n, subjects) => {
  const totalCredits = subjects.reduce((s, x) => s + x.credits, 0);
  const points = subjects.reduce((s, x) => s + GRADE_POINTS[x.grade] * x.credits, 0);
  return { semester: n, subjects, totalCredits, sgpa: Math.round((points / totalCredits) * 100) / 100 };
};

const semesters = [
  semester(1, [
    { name: "Engineering Mathematics I", grade: "A", credits: 4 },
    { name: "Physics", grade: "B+", credits: 3 },
    { name: "Programming in C", grade: "A+", credits: 4 },
    { name: "Basic Electronics", grade: "B", credits: 3 },
  ]),
  semester(2, [
    { name: "Engineering Mathematics II", grade: "A", credits: 4 },
    { name: "Data Structures", grade: "A+", credits: 4 },
    { name: "Digital Logic", grade: "B+", credits: 3 },
    { name: "Communication Skills", grade: "A", credits: 2 },
  ]),
  semester(3, [
    { name: "Object Oriented Programming", grade: "A+", credits: 4 },
    { name: "Discrete Mathematics", grade: "A", credits: 3 },
    { name: "Computer Organization", grade: "A", credits: 3 },
    { name: "Database Management Systems", grade: "A+", credits: 4 },
  ]),
  semester(4, [
    { name: "Design and Analysis of Algorithms", grade: "A+", credits: 4 },
    { name: "Operating Systems", grade: "A", credits: 4 },
    { name: "Computer Networks", grade: "A", credits: 3 },
    { name: "Software Engineering", grade: "O", credits: 3 },
  ]),
];

await mongoose.connect(`${process.env.MONGODB_URI}/GRADWISE`);

const existing = await Student.findOne({ email: DEMO_EMAIL });
if (existing) {
  await Promise.all([
    Project.deleteMany({ uploadedBy: existing._id }),
    Course.deleteMany({ uploadedBy: existing._id }),
    Academic.deleteMany({ uploadedBy: existing._id }),
    Certification.deleteMany({ uploadedBy: existing._id }),
  ]);
  await existing.deleteOne();
}

const skillDetails = [
  { name: "JavaScript", level: 85 },
  { name: "React", level: 80 },
  { name: "Node.js", level: 70 },
  { name: "MongoDB", level: 65 },
  { name: "Python", level: 75 },
  { name: "SQL", level: 60 },
  { name: "Git", level: 80 },
  { name: "Data Structures", level: 78 },
];

const Roadmap = [
  "Master advanced JavaScript and TypeScript fundamentals",
  "Build a full-stack MERN project with authentication",
  "Learn system design basics and REST API best practices",
  "Solve 150 data structures and algorithms problems",
  "Earn the AWS Cloud Practitioner certification",
  "Contribute to an open-source project on GitHub",
  "Create a polished portfolio website",
  "Apply for summer internships in web development",
  "Prepare for technical interviews with mock sessions",
];

const student = await Student.create({
  name: "Aarav Sharma",
  email: DEMO_EMAIL,
  password: DEMO_PASSWORD,
  contact: 9876543210,
  college: "GradWise Institute of Technology",
  year: 3,
  branch: "Computer Science",
  domain: "Full Stack Development",
  skills: skillDetails.map((s) => s.name),
  skillDetails,
  Roadmap,
  roadmapDone: [0, 1, 2],
});

const uploadedBy = student._id;

await Academic.insertMany(semesters.map((s) => ({ ...s, uploadedBy })));

await Project.insertMany([
  {
    githubRepo: "https://github.com/aarav-sharma/gradwise-portal",
    status: "Completed",
    summary: "Student career platform with profiles, skill tracking and an AI mentor.",
    techStack: ["React", "Node.js", "MongoDB", "Tailwind"],
    domain: "Web",
    uploadedBy,
  },
  {
    githubRepo: "https://github.com/aarav-sharma/expense-tracker",
    status: "In Progress",
    summary: "Expense tracker with charts and monthly budget alerts.",
    techStack: ["React", "Express", "Chart.js"],
    domain: "Web",
    uploadedBy,
  },
  {
    githubRepo: "https://github.com/aarav-sharma/sentiment-analyzer",
    status: "Completed",
    summary: "Sentiment classifier for product reviews using scikit-learn.",
    techStack: ["Python", "scikit-learn", "Flask"],
    domain: "AI",
    uploadedBy,
  },
]);

await Certification.insertMany([
  { title: "Meta Front-End Developer Certificate", issuer: "Coursera", issueDate: "2025-03-15", credentialUrl: "https://www.coursera.org/", uploadedBy },
  { title: "Python for Everybody", issuer: "University of Michigan", issueDate: "2024-11-02", credentialUrl: "https://www.coursera.org/", uploadedBy },
  { title: "MongoDB Basics", issuer: "MongoDB University", issueDate: "2025-06-20", credentialUrl: "https://learn.mongodb.com/", uploadedBy },
]);

await Course.insertMany([
  { courseLink: "https://www.freecodecamp.org/learn", title: "Responsive Web Design", platform: "freeCodeCamp", difficulty: "Beginner", duration: "300 hours", summary: "HTML and CSS fundamentals.", tags: ["HTML", "CSS"], uploadedBy },
  { courseLink: "https://www.coursera.org/learn/machine-learning", title: "Machine Learning Specialization", platform: "Coursera", difficulty: "Intermediate", duration: "3 months", summary: "Core machine learning with Python.", tags: ["Python", "ML"], uploadedBy },
  { courseLink: "https://www.udemy.com/", title: "System Design Fundamentals", platform: "Udemy", difficulty: "Advanced", duration: "12 hours", summary: "Scalable architecture patterns.", tags: ["System Design"], uploadedBy },
]);

console.log(`Demo student ready.\n  email:    ${DEMO_EMAIL}\n  password: ${DEMO_PASSWORD}`);
await mongoose.disconnect();
