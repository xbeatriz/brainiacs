//imports
import * as User from "../models/UserModel.js";

export function renderNavbar() {
  // Initialize the User model
  User.init();

  // Obtem o caminho da página atual
  const currentPath = window.location.pathname;

  // Decide se mostra "Be a Tutor" ou "Be a Student"
  let tutorMenuLabel = "Be a Tutor";
  let tutorMenuLink = "/html/be-a-tutor.html";

  if (currentPath.includes("be-a-tutor.html")) {
    tutorMenuLabel = "Be a Student";
    tutorMenuLink = "/";
  }

  let navbar = `
  <nav class="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
    <div class="max-w-screen-xl flex items-center justify-between mx-auto p-2">

      <!-- LOGO -->
      <a href="/" class="flex items-center space-x-2">
        <img src="/media/img/logo.svg" class="h-5" alt="Brainiacs Logo">
      </a>

      <!-- MENU CENTRAL -->
      <div class="hidden md:flex mx-auto">
        <ul class="flex space-x-6 font-medium text-sm">
          <li><a href="/html/courses.html" class="text-gray-900 hover:text-orange-500">Courses</a></li>
          <li><a href="${tutorMenuLink}" class="text-gray-900 hover:text-orange-500">${tutorMenuLabel}</a></li>
          <li><a href="/html/comunity.html" class="text-gray-900 hover:text-orange-500">Community</a></li>
        </ul>
      </div>

      <!-- BOTÕES À DIREITA -->
      <div class="flex items-center gap-2">
  `;


if (User.isLogged()) {
  const user = User.getUserLogged();
  const dashboardUrl = getDashboardUrl(user.role);
  navbar += `
        <a href="${dashboardUrl}" class="text-gray-900 hover:text-orange-500">${User.getUserLogged().username}</a>
        <button id="btnLogout" class="text-gray-900 hover:text-orange-500">Logout</button>
  `;
} else {
  navbar += `
      <button 
        id="loginButton"
        data-dialog-target="mdlLogin"
        class="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-sm px-8 py-1.5 text-center">
        Login
      </button>

      <button 
        id="registerButton" 
        data-bs-toggle="modal" 
        data-bs-target="mdlRegister"
        class="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-sm px-8 py-1.5 text-center">
        Register
      </button>
  `;
}

navbar += `
      </div>
    </div>
  </nav>
`;

document.getElementById("navbar").innerHTML = navbar;

  // ABRIR MODAIS
  document.getElementById("loginButton")?.addEventListener("click", () => {
    document.getElementById("mdlLogin").classList.remove("hidden");
    document.getElementById("mdlLogin").classList.add("flex");
  });

  document.getElementById("registerButton")?.addEventListener("click", () => {
    document.getElementById("mdlRegister").classList.remove("hidden");
    document.getElementById("mdlRegister").classList.add("flex");
  });

  // FECHAR MODAIS
  document.querySelectorAll(".btnCloseModal").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("mdlLogin")?.classList.add("hidden");
      document.getElementById("mdlLogin")?.classList.remove("flex");
      document.getElementById("mdlRegister")?.classList.add("hidden");
      document.getElementById("mdlRegister")?.classList.remove("flex");
    });
  });


  // REGISTER
    document
      .getElementById("frmRegister")
      ?.addEventListener("submit", (event) => {
        event.preventDefault();
        const registerUsername = document.getElementById("txtUsernameRegister");
        const registerPassword = document.getElementById("txtPasswordRegister");
        const registerPassword2 = document.getElementById("txtPasswordRegister2");
        try {
          if (registerPassword.value !== registerPassword2.value) {
            throw Error("Password and Confirm Password are not equal");
          }

          // Verifica a página atual para definir o role
          let registerRole = "user"; // default

          if (window.location.pathname.includes("be-a-tutor.html")) {
            registerRole = "tutor";
          }

          User.add(registerUsername.value, registerPassword.value, registerRole);
          displayMessage("msgRegister", "User registered with success!", "success");
          //setTimeout(() => location.reload(), 1000);
          // Atualiza a interface sem reload
          document.getElementById("frmRegister").reset();
          document.getElementById("mdlRegister").classList.add("hidden");
          document.getElementById("mdlRegister").classList.remove("flex");
        } catch (e) {
          displayMessage("msgRegister", e.message, "danger");
        }
      });

  // LOGIN
    document
      .getElementById("frmLogin")
      ?.addEventListener("submit", (event) => {
        event.preventDefault();
        try {
          User.login(
            document.getElementById("txtUsername").value,
            document.getElementById("txtPassword").value
          );
          displayMessage("msgLogin", "User logged in with success!", "success");
          localStorage.setItem("userLogged", JSON.stringify(User.getUserLogged()));
          setTimeout(() => location.reload(), 1500);
        } catch (e) {
          displayMessage("msgLogin", e.message, "danger");
        }
      });

  // LOGOUT
    document
     .getElementById("btnLogout")
      ?.addEventListener("click", () => {
      User.logout();
      localStorage.removeItem("userLogged");
      displayMessage("msgLogin", "User logged out with success!", "success");
      location.reload();
    });

    // MENSAGEM
    function displayMessage(modal, message, type) {
      const divMessage = document.getElementById(modal);
      divMessage.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
      setTimeout(() => {
        divMessage.innerHTML = "";
      }, 2000);
    }

    //função direcionamento
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

}
