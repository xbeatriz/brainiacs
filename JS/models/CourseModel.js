let courses = JSON.parse(localStorage.getItem("courses")) || [];

// Classe modelo
class Course {
  constructor(category, count) {
    this.id = Date.now() + Math.floor(Math.random() * 1000); // ID único baseado em timestamp
    this.category = category.trim();
    this.count = parseInt(count) || 0;
  }
}

// Adicionar curso
export function add(category, count) {
  if (!category || isNaN(count)) {
    throw new Error("Dados inválidos: 'category' e 'count' são obrigatórios.");
  }

  const course = new Course(category, count);
  courses.push(course);
  save();
}

// Obter todos os cursos
export function getAll() {
  return [...courses]; // Evita mutação direta do array original
}

// Obter curso por ID
export function getById(id) {
  const numericId = Number(id);
  return courses.find(course => course.id === numericId);
}

// Atualizar curso
export function update(id, updatedData) {
  const numericId = Number(id);
  const index = courses.findIndex(course => course.id === numericId);

  if (index === -1) {
    throw new Error('Curso com ID ${id} não encontrado.');
  }

  courses[index] = {
    ...courses[index],
    ...updatedData,
    id: courses[index].id // Garante que o ID não muda
  };

  save();
}

// Remover curso
export function remove(id) {
  const numericId = Number(id);
  const initialLength = courses.length;

  courses = courses.filter(course => course.id !== numericId);

  if (courses.length === initialLength) {
    throw new Error(`Curso com ID ${id} não encontrado.`);
  }

  save();
}

// Função auxiliar para guardar no localStorage
function save() {
  localStorage.setItem("courses", JSON.stringify(courses));
}