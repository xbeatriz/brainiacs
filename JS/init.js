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
    { category: "Art & Design", count: [] },
    { category: "Development", count: [] },
    { category: "Communication", count: [] },
    { category: "Videography", count: [] },
    { category: "Photography", count: [] },
    { category: "Marketing", count: [] },
    { category: "Content Writing", count: [] },
    { category: "Finance", count: [] },
    { category: "Science", count: [] },
    { category: "Network", count: [] },
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
    username: "user2",
    password: "password2",
    name: "Lucas Moreira",
    specialty: "Full-Stack Development (JavaScript, React, Node.js)",
    rate: 0,
    students: [],
  },
  {
    id: 2,
    name: "Ana Ribeiro",
    specialty: "Front-End Development (HTML, CSS, JavaScript)",
    rate: 0,
    students: [],
  },
  {
    id: 3,
    name: "Rafael Costa",
    specialty: "Back-End Development (Node.js, Express, MongoDB)",
    rate: 0,
    students: [],
  },
  {
    id: 4,
    name: "Mariana Lopes",
    specialty: "Full-Stack Development (Python, Django)",
    rate: 0,
    students: [],
  },
  {
    id: 5,
    name: "Tiago Fernandes",
    specialty: "Mobile Development (React Native, Expo)",
    rate: 0,
    students: [],
  },
  {
    id: 6,
    name: "João Martins",
    specialty: "Full-Stack Development (Java, Spring, Boot)",
    rate: 0,
    students: [],
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
    { id: 1,
      name: "Admin User",
      username: "admin", 
      password: "admin", 
      role: "admin",
      permissions: {
        canManageUsers: true,
        canViewReports: true,
        canManageTutors: true,
      },
      sessions: [],
      community: [],
      progress: []
    },
    { id: 2,
      name: "Regular User",
      username: "user1", 
      password: "password1", 
      role: "user", 
      sessions: [], 
      community: ["Finance Fundamentals", "Linear Algebra Circle"], 
      progress: [],
    },
  ];
  preUsers.forEach((user) => {
    UserModule.add(user.name, user.username, user.password, user.role, user.community, user.sessions, user.progress);
  });
}

}