import * as Tutor from "../models/TutorModel.js";

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar dados do tutor
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

  // Agora os elementos do modal existem, então adicionamos os listeners aqui:
  const btnContact = document.getElementById('btnContact');
  const modal = document.getElementById('modal');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const form = document.getElementById('contactForm');

  if (btnContact && modal && btnCloseModal && form) {
    btnContact.addEventListener('click', () => {
      modal.classList.remove('hidden');
    });

    btnCloseModal.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const session = {
        tutorName: tutor.name,
        date: formData.get('date'),
        time: formData.get('time'),
        message: formData.get('message')
      };

      // Simples persistência local
      const sessions = JSON.parse(localStorage.getItem('mySessions')) || [];
      sessions.push(session);
      localStorage.setItem('mySessions', JSON.stringify(sessions));

      alert("Sessão agendada!");
      modal.classList.add('hidden');
      form.reset();
    });
  } else {
    console.error('Modal elements not found!');
  }
});
