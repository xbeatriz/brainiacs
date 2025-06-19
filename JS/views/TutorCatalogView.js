import * as User from "../models/UserModel.js";
import * as Tutor from "../models/TutorModel.js";

function catalogView() {
  Tutor.init();
  renderCatalog(Tutor.getTutors());

  document.querySelector("#btnFilter").addEventListener("click", () => {
    renderCatalog(
      Tutor.getTutors(
        document.querySelector("#txtTutor").value,
        document.querySelector("#sltSubject").value
      )
    );
  });

  document.querySelector("#btnSort").addEventListener("click", () => {
    Tutor.sortTutors();
    renderCatalog(Tutor.getTutors());
  });
}

function renderCatalog(tutors = []) {
  let result = "";
  for (const tutor of tutors) {
    result += generateCard(tutor);
  }

  document.querySelector("#myCatalog").innerHTML = result;

  const btnsRemove = document.getElementsByClassName("remove");
  for (const button of btnsRemove) {
    button.addEventListener("click", () => {
      if (confirm("Deseja mesmo remover o explicador?")) {
        Tutor.removeTutor(button.id);
        location.reload();
      }
    });
  }
}


catalogView();
