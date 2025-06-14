//imports
import * as tutorsModule from "./models/TutorModel.js";
import * as UserModule from "./models/UserModel.js";

// init.js
initdata();

function initdata() {
// ** Dados dos Cursos e Tutores **
if (!localStorage.courses){
  const courses = [
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
/*courses.forEach((course) => {
      course.add(course.category, course.count);
    });
*/localStorage.setItem("courses", JSON.stringify(courses));
}

if (!localStorage.community){
  const community = [
  {
      id: 1,
      title: "Linear Algebra Circle",
      subject: "Linear Algebra",
      description: "A study group focused on solving problem sets, discussing theory, and preparing for exams.",
      image: "https://placehold.co/400"
    },
    {
      id: 2,
      title: "Code & Logic Lab",
      subject: "Development",
      description: "Explore programming fundamentals, algorithms, and web projects.",
      image: "https://placehold.co/400"
    },
    {
      id: 3,
      title: "Finance Fundamentals",
      subject: "Finance",
      description: "Discuss budgeting, investment basics, and financial modeling.",
      image: "https://placehold.co/400"
    }
  ];
localStorage.setItem("community", JSON.stringify(community));
}

if (!localStorage.tutors) {
const tutors = [
  {
    name: "Lucas Moreira",
    specialty: "Full-Stack Development (JavaScript, React, Node.js)",
    rate: 424,
    students: 9500,
  },
  {
    name: "Ana Ribeiro",
    specialty: "Front-End Development (HTML, CSS, JavaScript)",
    rate: 384,
    students: 900,
  },
  {
    name: "Rafael Costa",
    specialty: "Back-End Development (Node.js, Express, MongoDB)",
    rate: 456,
    students: 450,
  },
  {
    name: "Mariana Lopes",
    specialty: "Full-Stack Development (Python, Django)",
    rate: 406,
    students: 1200,
  },
  {
    name: "Tiago Fernandes",
    specialty: "Mobile Development (React Native, Expo)",
    rate: 400,
    students: 800,
  },
  {
    name: "João Martins",
    specialty: "Full-Stack Development (Java, Spring, Boot)",
    rate: 412,
    students: 600,
  },
];
tutors.forEach((tutor) => {
      tutorsModule.add(tutor.name, tutor.specialty, tutor.rate, tutor.students);
    });
//localStorage.setItem("tutors", JSON.stringify(tutors));
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