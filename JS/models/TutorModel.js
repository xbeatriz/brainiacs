let tutors = [];

if (localStorage.getItem("tutors")) {
  tutors = JSON.parse(localStorage.getItem("tutors"));
} else {
  localStorage.setItem("tutors", JSON.stringify(tutors));
}

// CLASSE MODELO
class Tutor {
  constructor(name, specialty, rate, students, image) {
    this.id = Date.now(); // id único
    this.name = name;
    this.specialty = specialty;
    this.rate = rate;
    this.students = students;
    this.image = image;
  }
}

// ADICIONAR
export function add(name, specialty, rate, students, image) {
  tutors.push(new Tutor(name, specialty, rate, students, image));
  localStorage.setItem("tutors", JSON.stringify(tutors));
}

// OBTER TODOS
export function getAll() {
  return tutors;
}

// OBTER POR ID
export function getById(id) {
  return tutors.find((tutor) => tutor.id === id);
}

// REMOVER
export function remove(id) {
  tutors = tutors.filter((tutor) => tutor.id !== id);
  localStorage.setItem("tutors", JSON.stringify(tutors));
}

// EDITAR
export function update(id, updatedTutor) {
  const index = tutors.findIndex((tutor) => tutor.id === id);
  if (index !== -1) {
    tutors[index] = { ...tutors[index], ...updatedTutor };
    localStorage.setItem("tutors", JSON.stringify(tutors));
  }
}
