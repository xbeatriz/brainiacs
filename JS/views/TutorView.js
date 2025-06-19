import * as Tutor from "../models/TutorModel.js";

function tutorView() {
  Tutor.init();

  const tutor = Tutor.getCurrentTutor();

  document.querySelector("#tutorName").innerHTML = tutor.name;
  document.querySelector("#tutorSubject").innerHTML = tutor.subject;
  document.querySelector("#tutorBio").innerHTML = tutor.bio || tutor.desc;
  document.querySelector("#tutorPhoto").src = tutor.photo;
}

tutorView();
