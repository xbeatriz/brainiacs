//imports
import * as tutorsModule from "./models/TutorModel.js";
import * as UserModule from "./models/UserModel.js";
import * as CourseModule from "./models/CourseModel.js";
import * as CommunityModule from "./models/CommunityModel.js";

// init.js
initdata();

function initdata() {

//Dados dos Cursos
const existingCourses = JSON.parse(localStorage.getItem("courses") || "[]");

if (existingCourses.length === 0) {
  const initialCourses = [
    { category: "Art & Design", count: 38 },
    { category: "Development", count: 38 },
    { category: "Communication", count: 38 },
    { category: "Videography", count: 38 },
    { category: "Photography", count: 38 },
    { category: "Marketing", count: 38 },
    { category: "Content Writing", count: 38 },
    { category: "Finance", count: 38 },
    { category: "Science", count: 38 },
    { category: "Network", count: 38 },
  ];

  initialCourses.forEach(course => {
    CourseModule.add(course.category, course.count);
  });
}

//Dados da Comunidade
const existingCommunity = JSON.parse(localStorage.getItem("community") || "[]");

if (existingCommunity.length === 0) {
  const groups = [
    {
      title: "Linear Algebra Circle",
      subject: "Linear Algebra",
      description: "A study group focused on solving problem sets, discussing theory, and preparing for exams.",
      image: "https://placehold.co/400"
    },
    {
      title: "Code & Logic Lab",
      subject: "Development",
      description: "Explore programming fundamentals, algorithms, and web projects.",
      image: "https://placehold.co/400"
    },
    {
      title: "Finance Fundamentals",
      subject: "Finance",
      description: "Discuss budgeting, investment basics, and financial modeling.",
      image: "https://placehold.co/400"
    }
  ];

  groups.forEach(group => {
    CommunityModule.add(group.title, group.subject, group.description, group.image);
  });
}

//Dados dos Tutores
const existingTutors = JSON.parse(localStorage.getItem("tutors") || "[]");

if (existingTutors.length === 0) {
  const tutors = [
    {
    id: 1,
    name: "Lucas Moreira",
    specialty: "Full-Stack Development (JavaScript, React, Node.js)",
    rate: 424,
    students: 9500,
  },
  {
    id: 2,
    name: "Ana Ribeiro",
    specialty: "Front-End Development (HTML, CSS, JavaScript)",
    rate: 384,
    students: 900,
  },
  {
    id: 3,
    name: "Rafael Costa",
    specialty: "Back-End Development (Node.js, Express, MongoDB)",
    rate: 456,
    students: 450,
  },
  {
    id: 4,
    name: "Mariana Lopes",
    specialty: "Full-Stack Development (Python, Django)",
    rate: 406,
    students: 1200,
  },
  {
    id: 5,
    name: "Tiago Fernandes",
    specialty: "Mobile Development (React Native, Expo)",
    rate: 400,
    students: 800,
  },
  {
    id: 6,
    name: "João Martins",
    specialty: "Full-Stack Development (Java, Spring, Boot)",
    rate: 412,
    students: 600,
  },
];
tutors.forEach((tutor) => {
      tutorsModule.add(tutor.id, tutor.name, tutor.specialty, tutor.rate, tutor.students);
    });
  }

//Users predefinidos
const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
if (existingUsers.length === 0) {
  const preUsers = [
    { id: 1, username: "admin", password: "admin", role: "admin" },
    { id: 2, username: "user1", password: "password1", role: "user" },
    { id: 3, username: "user2", password: "password2", role: "tutor" },
  ];
  preUsers.forEach((user) => {
    UserModule.add(user.username, user.password, user.role);
  });
}

}