
let tutors = [];

export function init() {
  tutors = localStorage.tutors ? JSON.parse(localStorage.tutors) : [];
}

export function add(
  name,
  subjects,
  availability,
  mode,
  price,
  location,
  rating,
  photo,
  desc,
  email
) {
  if (tutors.some((t) => t.name === name || t.email === email)) {
    throw Error(`Tutor com nome ou email já existe!`);
  }

  const id = Date.now().toString(); // id simples usando timestamp

  const newTutor = new Tutor(
    id,
    name,
    username,
    subjects,
    availability,
    mode,
    price,
    location,
    rating,
    photo,
    desc,
    email
  );

  tutors.push(newTutor);
  localStorage.setItem("tutors", JSON.stringify(tutors));
}


export function removeTutor(name) {
  tutors = tutors.filter((tutor) => tutor.name !== name);
  localStorage.setItem("tutors", JSON.stringify(tutors));
}

export function setCurrentTutor(tutor) {
  localStorage.setItem("currentTutor", JSON.stringify(tutor));
}

// OBTER o tutor ATUAL (TODO O OBJETO)
export function getCurrentTutor() {
  const tutorJSON = localStorage.getItem("currentTutor");
  if (!tutorJSON) return null;
  try {
    return JSON.parse(tutorJSON);
  } catch {
    return null;
  }
}

// READ - Obter todos os tutores
export function getAll() {
  return [...tutors]; 
}

// UPDATE - Atualizar tutor
export function update(id, updatedFields) {
  const idStr = id.toString();
  const index = tutors.findIndex((tutor) => tutor.id.toString() === idStr);
  if (index === -1) throw Error(`Tutor com ID "${id}" não encontrado!`);

  tutors[index] = { ...tutors[index], ...updatedFields };
  save();
}


export function getTutorById(id) {
  const allTutors = JSON.parse(localStorage.getItem("tutors")) || [];
  return allTutors.find((tutor) => tutor.id === id);
}

export function sortTutors() {
  tutors.sort((a, b) => a.name.localeCompare(b.name));
}

export function getTutors(
  filterName = "",
  filterSubject = "",
  isSorted = false
) {
  let filtered = tutors.filter(
    (tutor) =>
      (tutor.name.toLowerCase().includes(filterName.toLowerCase()) ||
        filterName === "") &&
      (tutor.subject === filterSubject || filterSubject === "")
  );

  return isSorted
    ? filtered.sort((a, b) => a.name.localeCompare(b.name))
    : filtered;
}

// Salvar no localStorage
function save() {
  localStorage.setItem("tutors", JSON.stringify(tutors));
}

class Tutor {
  id = "";
  name = "";
  subjects = []; // pode ser um array de disciplinas
  availability = ""; // horário disponível (ex: "Manhã", "Tarde", "Noite")
  mode = ""; // "online" ou "presencial"
  price = 0;
  location = "";
  rating = 0; // classificação média (número)
  photo = "";
  desc = "";
  email = "";

  constructor(
    id,
    name,
    subjects,
    availability,
    mode,
    price,
    location,
    rating,
    photo,
    desc,
    email
  ) {
    this.id = id;
    this.name = name;
    this.subjects = subjects;
    this.availability = availability;
    this.mode = mode;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photo = photo;
    this.desc = desc;
    this.email = email;
  }
}
