// init.js

// ** Dados dos Cursos e Tutores **
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

const tutors = [
  {
    name: "Lucas Moreira",
    specialty: "Full-Stack Development (JavaScript, React, Node.js)",
    rate: 424,
    students: 9500,
    image: "path/to/lucas.jpg", // Substitua pelo caminho correto da imagem
  },
  {
    name: "Ana Ribeiro",
    specialty: "Front-End Development (HTML, CSS, JavaScript)",
    rate: 384,
    students: 900,
    image: "path/to/ana.jpg", // Substitua pelo caminho correto da imagem
  },
  {
    name: "Rafael Costa",
    specialty: "Back-End Development (Node.js, Express, MongoDB)",
    rate: 456,
    students: 450,
    image: "path/to/rafael.jpg", // Substitua pelo caminho correto da imagem
  },
  {
    name: "Mariana Lopes",
    specialty: "Full-Stack Development (Python, Django)",
    rate: 406,
    students: 1200,
    image: "path/to/mariana.jpg", // Substitua pelo caminho correto da imagem
  },
  {
    name: "Tiago Fernandes",
    specialty: "Mobile Development (React Native, Expo)",
    rate: 400,
    students: 800,
    image: "path/to/tiago.jpg", // Substitua pelo caminho correto da imagem
  },
  {
    name: "João Martins",
    specialty: "Full-Stack Development (Java, Spring, Boot)",
    rate: 412,
    students: 600,
    image: "path/to/joao.jpg", // Substitua pelo caminho correto da imagem
  },
];

// ** Função para Exibir Cursos **
function displayCourses() {
  const coursesContainer = document.getElementById("courses-container"); // ID do container no HTML
  courses.forEach(course => {
    const courseElement = document.createElement("div");
    courseElement.className = "course";
    courseElement.innerHTML = `
      <h3>${course.category}</h3>
      <p>${course.count} Courses</p>
    `;
    coursesContainer.appendChild(courseElement);
  });
}

// ** Função para Exibir Tutores **
function displayTutors() {
  const tutorsContainer = document.getElementById("tutors-container"); // ID do container no HTML
  tutors.forEach(tutor => {
    const tutorElement = document.createElement("div");
    tutorElement.className = "tutor";
    tutorElement.innerHTML = `
      <img src="${tutor.image}" alt="${tutor.name}">
      <h4>${tutor.name}</h4>
      <p>${tutor.specialty}</p>
      <p>${tutor.rate} €/h</p>
      <p>${tutor.students} Students</p>
    `;
    tutorsContainer.appendChild(tutorElement);
  });
}

// ** Inicialização **
document.addEventListener("DOMContentLoaded", () => {
  displayCourses();
  displayTutors();
});
