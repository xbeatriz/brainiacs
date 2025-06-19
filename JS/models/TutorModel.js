let tutors = JSON.parse(localStorage.getItem("tutors")) || [];

// CLASSE MODELO
class Tutor {
  constructor(id, name, specialty, rate, students, image) {
    this.id = id ?? Date.now(); // se não for fornecido, gera automaticamente
    this.name = name;
    this.specialty = specialty;
    this.rate = rate;
    this.students = students;
    this.image = image;
  }
}

// ADICIONAR
export function add(name, specialty, rate, students, image, id = null) {
  const newTutor = new Tutor(id, name, specialty, rate, students, image);
  tutors.push(newTutor);
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
  const updated = tutors.filter((tutor) => tutor.id !== id);
  localStorage.setItem("tutors", JSON.stringify(updated));
  tutors = updated; // atualizar array local
}

// EDITAR
export function update(id, updatedTutor) {
  const index = tutors.findIndex((tutor) => tutor.id === id);
  if (index !== -1) {
    tutors[index] = { ...tutors[index], ...updatedTutor };
    localStorage.setItem("tutors", JSON.stringify(tutors));
  }
}
