let tutors = [];

export function init() {
  tutors = localStorage.tutors ? JSON.parse(localStorage.tutors) : [];
}

export function add(name, subject, photo, desc, email) {
  if (tutors.some((tutor) => tutor.name === name)) {
    throw Error(`Tutor with name "${name}" already exists!`);
  } else {
    tutors.push(new Tutor(name, subject, photo, desc, email));
    localStorage.setItem("tutors", JSON.stringify(tutors));
  }
}

export function removeTutor(name) {
  tutors = tutors.filter((tutor) => tutor.name !== name);
  localStorage.setItem("tutors", JSON.stringify(tutors));
}

export function setCurrentTutor(name) {
  localStorage.setItem("tutor", name);
}

export function getCurrentTutor() {
  return tutors.find((tutor) => tutor.name === localStorage.getItem("tutor"));
}

export function sortTutors() {
  tutors.sort((a, b) => a.name.localeCompare(b.name));
}

export function getTutors(filterName = "", filterSubject = "", isSorted = false) {
  let filtered = tutors.filter(
    (tutor) =>
      (tutor.name.toLowerCase().includes(filterName.toLowerCase()) || filterName === "") &&
      (tutor.subject === filterSubject || filterSubject === "")
  );

  return isSorted ? filtered.sort((a, b) => a.name.localeCompare(b.name)) : filtered;
}

class Tutor {
  name = "";
  subject = "";
  photo = "";
  desc = "";
  email = "";

  constructor(name, subject, photo, desc, email) {
    this.name = name;
    this.subject = subject;
    this.photo = photo;
    this.desc = desc;
    this.email = email;
  }
}
