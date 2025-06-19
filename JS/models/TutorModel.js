let tutors = [];

export function init() {
  tutors = localStorage.tutors ? JSON.parse(localStorage.tutors) : [];
}

export function add(
  name,
  subject,
  photo,
  desc,
  email,
  grade,
  availability,
  price,
  mode,
  location
) {
  if (tutors.some((tutor) => tutor.name === name)) {
    throw Error(`Tutor with name "${name}" already exists!`);
  } else {
    tutors.push(
      new Tutor(
        name,
        subject,
        photo,
        desc,
        email,
        grade,
        availability,
        price,
        mode,
        location
      )
    );
    localStorage.setItem("tutors", JSON.stringify(tutors));
  }
  let id = Date.now().toString(); // Garante um ID único
  let newTutor = new Tutor(id, name, grade, availability, price, location, mode, subject, photo, desc, email);
  tutors.push(newTutor);
  save();
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
  id = ""; // This will be set later when adding to the array
  name = "";
  grade = "";
  availability = "";
  price = 0;
  location = "";
  mode = ""; // online or nearby
  subject = "";
  photo = "";
  desc = "";
  email = "";

  constructor(
    id,
    name,
    grade,
    availability,
    price,
    mode,
    subject,
    photo,
    desc,
    email
  ) {
    this.id = id;
    this.name = name;
    this.grade = grade;
    this.availability = availability;
    this.price = price;
    this.mode = mode;
    this.subject = subject;
    this.photo = photo;
    this.desc = desc;
    this.email = email;
  }
}
