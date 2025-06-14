let courses = JSON.parse(localStorage.getItem("courses")) || [];

// Classe modelo (opcional, mas incluída por consistência)
class Course {
  constructor(category, count) {
    this.id = Date.now();
    this.category = category;
    this.count = count;
  }
}

// Adicionar curso
export function add(category, count) {
  const course = new Course(category, count);
  courses.push(course);
  localStorage.setItem("courses", JSON.stringify(courses));
}

// Obter todos os cursos
export function getAll() {
  return courses;
}

// Obter curso por ID
export function getById(id) {
  return courses.find((course) => course.id === id);
}

// Atualizar curso
export function update(id, updatedData) {
  const index = courses.findIndex((course) => course.id === id);
  if (index !== -1) {
    courses[index] = { ...courses[index], ...updatedData };
    localStorage.setItem("courses", JSON.stringify(courses));
  }
}

// Remover curso
export function remove(id) {
  courses = courses.filter((course) => course.id !== id);
  localStorage.setItem("courses", JSON.stringify(courses));
}
