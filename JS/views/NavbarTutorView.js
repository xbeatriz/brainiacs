// imports
import * as Tutors from "../models/TutorModel.js";
import * as User from "../models/UserModel.js";

// Função para exibir mensagens
function displayMessage(elementId, message, type) {
  const messageElement = document.getElementById(elementId);
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.className = type === "success" ? "text-green-600" : "text-red-600";
    messageElement.style.display = "block"; // Exibe a mensagem
  }
}

function renderNavbarTutorDashboard() {
  // Initialize the Tutor model
  Tutors.init();

  const navbarTutorDashboard = `
    <nav class="bg-white border-gray-200 fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        <!-- Logo -->
        <a href="/" class="flex items-center space-x-3">
          <img src="/media/img/logo-tutor.svg" class="h-5" alt="Brainiacs Logo" />
        </a>

        <!-- Avatar + Toggle Button (Mobile) -->
        <div class="flex items-center md:order-2 space-x-3">
          <button 
            id="loginButtonTutor"
            class="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-sm px-8 py-1.5 text-center">
            Login
          </button>
        </div>
      </div>
    </nav>
  `;

  document.getElementById("navbarTutorDashboard").innerHTML = navbarTutorDashboard;
}

// ABRIR MODAIS
document.addEventListener('DOMContentLoaded', () => {
  renderNavbarTutorDashboard();

  // Adiciona o evento de clique ao botão de login
  document.getElementById("loginButtonTutor")?.addEventListener("click", () => {
    const modalLogin = document.getElementById("mdlLogin");
    modalLogin.classList.remove("hidden");
    modalLogin.classList.add("flex");
  });

  // FECHAR MODAIS
  document.querySelectorAll(".btnCloseModal").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalLogin = document.getElementById("mdlLogin");
      modalLogin.classList.add("hidden");
      modalLogin.classList.remove("flex");
    });
  });

  // LOGIN
  document.getElementById("frmLogin")?.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      // Tenta fazer login como usuário
      User.login(
        document.getElementById("txtUsername").value,
        document.getElementById("txtPassword").value
      );
      let user = User.getUserLogged();
      displayMessage("msgLogin", "User  logged in with success!", "success");
      setTimeout(() => { window.location.href = getDashboardUrl(user.role) }, 1500);
      
    } catch (e) {
      // Se falhar, tenta fazer login como tutor
      try {
        Tutors.login(
          document.getElementById("txtUsername").value,
          document.getElementById("txtPassword").value
        );
        let tutor = Tutors.getTutorLogged();
        displayMessage("msgLogin", "Tutor logged in with success!", "success");
        setTimeout(() => { window.location.href = getDashboardUrl(tutor.role) }, 1500);
        
      } catch (e) {
        // Se ambos falharem, exibe a mensagem de erro
        displayMessage("msgLogin", e.message, "danger");
      }
    }
  });

  function getDashboardUrl(role) {
    switch (role) {
      case "admin":
        return "/html/adminDash/adminDash.html";
      case "tutor":
        return "/html/tutorDash/tutorDash.html";
      case "user":
      default:
        return "/html/studentDash/studentDash.html";
    }
  }
});
