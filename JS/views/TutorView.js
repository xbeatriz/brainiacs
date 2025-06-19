import * as Tutor from "../models/TutorModel.js";
import * as User from "../models/UserModel.js";

document.addEventListener('DOMContentLoaded', () => {
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

  const btnContact = document.getElementById('btnContact');
  const modal = document.getElementById('modal');
  const modalLogin = document.getElementById('mdlLogin');
  const modalRegister = document.getElementById('mdlRegister');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const form = document.getElementById('contactForm');

  // Botão de contato
  btnContact?.addEventListener('click', () => {
    if (User.isLogged()) {
      modal.classList.remove('hidden');
    } else {
      modalLogin.classList.remove('hidden');
    }
  });

  // Fechar modal agendamento
  btnCloseModal?.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Submissão do agendamento
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const session = {
      tutorName: tutor.name,
      date: formData.get('date'),
      time: formData.get('time'),
      message: formData.get('message')
    };

    const sessions = JSON.parse(localStorage.getItem('mySessions')) || [];
    sessions.push(session);
    localStorage.setItem('mySessions', JSON.stringify(sessions));

    alert("Sessão agendada!");
    modal.classList.add('hidden');
    form.reset();
  });

  // Criar link "Não tem conta? Registre-se aqui" no modal login
  const loginMessage = document.getElementById('msgLogin');
  if (loginMessage) {
    const registerLink = document.createElement('p');
    registerLink.classList.add('text-sm', 'text-gray-600', 'mt-2');
    registerLink.innerHTML = `Não tem conta? <a href="#" id="linkToRegister" class="text-orange-500 underline hover:text-orange-600">Registe-se aqui</a>`;
    loginMessage.appendChild(registerLink);
  }

  // Criar link "Já tem conta? Faça login" no modal registro
  const registerMessage = document.getElementById('msgRegister');
  if (registerMessage) {
    const loginLink = document.createElement('p');
    loginLink.classList.add('text-sm', 'text-gray-600', 'mt-2');
    loginLink.innerHTML = `Já tem conta? <a href="#" id="linkToLogin" class="text-orange-500 underline hover:text-orange-600">Faça login</a>`;
    registerMessage.appendChild(loginLink);
  }

  // Listener para trocar modais quando clicar nos links
  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'linkToRegister') {
      modalLogin.classList.add('hidden');
      modalRegister.classList.remove('hidden');
    }
    if (e.target && e.target.id === 'linkToLogin') {
      modalRegister.classList.add('hidden');
      modalLogin.classList.remove('hidden');
    }
  });

  // Botões para fechar qualquer modal (Login/Registo)
  document.querySelectorAll('.btnCloseModal').forEach(btn => {
    btn.addEventListener('click', () => {
      modalLogin.classList.add('hidden');
      modalRegister.classList.add('hidden');
    });
  });
});
