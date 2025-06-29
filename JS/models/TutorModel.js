
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
  email,
  password
) {
  if (tutors.some((t) => t.name === name || t.email === email)) {
    throw Error(`Tutor com nome ou email já existe!`);
  }

  const id = Date.now().toString(); // id simples usando timestamp

  const newTutor = new Tutor(
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
    email,
    password
  );

  tutors.push(newTutor);
  localStorage.setItem("tutors", JSON.stringify(tutors));
}

export function login(email, password) {
    // Busca tutores registrados no localStorage
    const tutors = JSON.parse(localStorage.getItem("tutors")) || [];
    // Procura o tutor pelo email
    const tutor = tutors.find(t => t.email === email);
    // Verifica se o tutor existe
    if (!tutor) {
        throw new Error("Tutor não encontrado com este email");
    }
    // Verifica a senha (em produção, use hashing para senhas)
    if (tutor.password !== password) {
        throw new Error("Senha incorreta");
    }
    // Armazena o tutor logado no localStorage
    sessionStorage.setItem("loggedUser", JSON.stringify(tutor));
}

// DEVOLVE O UTILIZADOR AUTENTICADO
export function getTutorLogged() {
  return JSON.parse(sessionStorage.getItem("loggedUser"));
}

export function removeTutor(username) {
  tutors = tutors.filter((tutor) => tutor.username !== username);
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
  password = ""; // senha do tutor

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
    email,
    password
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
    this.password = password;
  }
}
