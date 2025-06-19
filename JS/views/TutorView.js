import * as Tutor from "../models/TutorModel.js";

function tutorView() {
  const tutor = Tutor.getCurrentTutor();
  if (!tutor) return;

  document.querySelector("#tutorName").innerHTML = tutor.name;
  document.querySelector("#tutorSubject").innerHTML = tutor.subject;
  document.querySelector("#tutorBio").innerHTML = tutor.bio;
  document.querySelector("#tutorPhoto").src = tutor.photo;
}

tutorView();
