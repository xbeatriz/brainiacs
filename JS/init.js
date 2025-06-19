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

    initialCourses.forEach((course) => {
      CourseModule.add(course.category, course.count);
    });
  }

  //Dados da Comunidade
  const existingCommunity = JSON.parse(
    localStorage.getItem("community") || "[]"
  );

  if (existingCommunity.length === 0) {
    const groups = [
      {
        title: "Linear Algebra Circle",
        subject: "Linear Algebra",
        description:
          "A study group focused on solving problem sets, discussing theory, and preparing for exams.",
        image: "/media/img/algebra.png",
      },
      {
        title: "Code & Logic Lab",
        subject: "Development",
        description:
          "Explore programming fundamentals, algorithms, and web projects.",
        image: "/media/img/code.png",
      },
      {
        title: "Finance Fundamentals",
        subject: "Finance",
        description:
          "Discuss budgeting, investment basics, and financial modeling.",
        image: "/media/img/finance.png",
      },
    ];

    groups.forEach((group) => {
      CommunityModule.add(
        group.title,
        group.subject,
        group.description,
        group.image
      );
    });
  }

  //Dados dos Tutores
  const existingTutors = JSON.parse(localStorage.getItem("tutors") || "[]");

  if (existingTutors.length === 0) {
    const tutors = [
      {
        id: 1,
        name: "Ana Silva",
        subject: "Matemática",
        grade: "1st",
        availability: "Morning",
        price: 20,
        location: "Lisboa",
        mode: "online",
        photo: "/media/img/algebra.png",
        desc: "Explicadora paciente e com métodos visuais.",
        email: "ana.silva@email.com",
      },
      {
        id: 2,
        name: "Bruno Rocha",
        subject: "Matemática",
        grade: "2nd",
        availability: "Afternoon",
        price: 25,
        location: "Porto",
        mode: "nearby",
        photo: "https://randomuser.me/api/portraits/men/31.jpg",
        desc: "Ajudo com dificuldades básicas e avançadas.",
        email: "bruno.rocha@email.com",
      },
      {
        id: 3,
        name: "Carla Mendes",
        subject: "Matemática",
        grade: "High School",
        availability: "Evening",
        price: 30,
        location: "Lisboa",
        mode: "online",
        photo: "https://randomuser.me/api/portraits/women/56.jpg",
        desc: "Foco em preparação para exames nacionais.",
        email: "carla.mendes@email.com",
      },
      {
        id: 4,
        name: "David Oliveira",
        subject: "Física",
        grade: "High School",
        availability: "Morning",
        price: 30,
        location: "Lisboa",
        mode: "online",
        photo: "https://randomuser.me/api/portraits/men/60.jpg",
        desc: "Torne a física mais simples e intuitiva.",
        email: "david.oliveira@email.com",
      },
      {
        id: 5,
        name: "Elisa Ramos",
        subject: "Biologia",
        grade: "2nd",
        availability: "Afternoon",
        price: 22,
        location: "Porto",
        mode: "nearby",
        photo: "https://randomuser.me/api/portraits/women/66.jpg",
        desc: "Ensino com foco em curiosidade e exemplos reais.",
        email: "elisa.ramos@email.com",
      },
      {
        id: 6,
        name: "Filipe Costa",
        subject: "Inglês",
        grade: "High School",
        availability: "Evening",
        price: 28,
        location: "Lisboa",
        mode: "online",
        photo: "https://randomuser.me/api/portraits/men/75.jpg",
        desc: "Conversação e escrita para todos os níveis.",
        email: "filipe.costa@email.com",
      },
      {
        id: 7,
        name: "Gabriela Tavares",
        subject: "Química",
        grade: "1st",
        availability: "Morning",
        price: 24,
        location: "Lisboa",
        mode: "nearby",
        photo: "https://randomuser.me/api/portraits/women/81.jpg",
        desc: "Ensino com experiências e demonstrações práticas.",
        email: "gabriela.tavares@email.com",
      },
    ];
    localStorage.setItem("tutors", JSON.stringify(tutors));
  }

  //Users predefinidos
  const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
  if (existingUsers.length === 0) {
    const preUsers = [
      {
        id: 1,
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
        progress: [],
      },
      {
        id: 2,
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
      UserModule.add(
        user.name,
        user.username,
        user.password,
        user.role,
        user.community,
        user.sessions,
        user.progress
      );
    });
  }
}
