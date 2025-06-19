import * as Tutor from "../models/TutorModel.js";
/* console.log("Tutor object:", Tutor);
console.log("getCurrentTutor:", Tutor.getCurrentTutor);
if (typeof Tutor.getCurrentTutor !== "function") {
  console.error("getCurrentTutor não é uma função");
} else {
  console.log("Chamando getCurrentTutor...");
  const currentTutor = Tutor.getCurrentTutor();
  console.log("Current tutor:", currentTutor);
} */
function tutorView() {
  Tutor.init();

  const tutor = Tutor.getCurrentTutor();

  if (!tutor) {
    document.querySelector("#tutorName").textContent = "Tutor não encontrado";
    return;
  }

  document.getElementById("tutorName").textContent = tutor.name;
  document.getElementById("tutorSubject").textContent = tutor.subject;
  document.getElementById("tutorPhoto").src = tutor.photo;
  document.getElementById("tutorBio").textContent = tutor.desc;
  document.getElementById("tutorLocation").textContent = tutor.location;
  document.getElementById("tutorExperience").textContent = tutor.experience;
  document.getElementById("tutorPrice").textContent = tutor.price;
  document.getElementById("tutorAvailability").textContent = tutor.availability;
}

tutorView();
