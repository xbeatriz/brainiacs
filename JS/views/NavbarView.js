//imports
import * as User from "../models/UserModel.js";
import * as Tutor from "../models/TutorModel.js";

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
        <a href="${dashboardUrl}" class="text-gray-900 hover:text-orange-500">${
      User.getUserLogged().name
    }</a>
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
  document.querySelectorAll(".btnCloseModal").forEach((btn) => {
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

        let name = registerUsername.value;
        User.add(
          name,
          registerUsername.value,
          registerPassword.value,
          registerRole
        );
        displayMessage(
          "msgRegister",
          "User registered with success!",
          "success"
        );
        //setTimeout(() => location.reload(), 1000);
        // Atualiza a interface sem reload
        document.getElementById("frmRegister").reset();
        document.getElementById("mdlRegister").classList.add("hidden");
        document.getElementById("mdlRegister").classList.remove("flex");
      } catch (e) {
        displayMessage("msgRegister", e.message, "danger");
      }
    });

    document
      .getElementById("frmRegisterTutor")
      ?.addEventListener("submit", (event) => {
        event.preventDefault();
    
        const registerUsername = document
          .getElementById("txtUsernameRegister")
          .value.trim();
        const registerPassword = document.getElementById(
          "txtPasswordRegister"
        ).value;
        const registerPassword2 = document.getElementById(
          "txtPasswordRegister2"
        ).value;
        const registerSubjects = document.getElementById("subjects").value.trim();
        const registerAvailability =
          document.getElementById("txtAvailability").value;
        const registerTeachingMode =
          document.getElementById("txtTeachingMode").value;
        const registerPrice = Number(document.getElementById("price").value);
        const registerLocation = document.getElementById("location").value.trim();
    
        try {
          if (registerPassword !== registerPassword2) {
            throw Error("Password and Confirm Password are not equal");
          }
    
          const name = registerUsername;
          const subject = registerSubjects;
          const photo = ""; // Ainda não tens input
          const desc = ""; // Ainda não tens input
          const email = ""; // Ainda não tens input
          const grade = ""; // Ainda não tens input
          const availability = registerAvailability;
          const price = registerPrice;
          const mode = registerTeachingMode;
          const location = registerLocation;
    
          tutors.add(
            name,
            subject,
            photo,
            desc,
            email,
            grade,
            availability,
            price,
            mode,
            location
          );
    
          displayMessage(
            "msgRegister",
            "Tutor registered with success!",
            "success"
          );
    
          document.getElementById("frmRegisterTutor").reset();
          document.getElementById("mdlRegister").classList.add("hidden");
          document.getElementById("mdlRegister").classList.remove("flex");
        } catch (e) {
          displayMessage("msgRegister", e.message, "danger");
        }
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
            Tutor.login(
                document.getElementById("txtUsername").value,
                document.getElementById("txtPassword").value
            );
            let tutor = Tutor.getTutorLogged();
            console.log(tutor);
            displayMessage("msgLogin", "Tutor logged in with success!", "success");
            setTimeout(() => { window.location.href = getDashboardUrl(tutor.role) }, 1500);
            
        } catch (e) {
            // Se ambos falharem, exibe a mensagem de erro
            displayMessage("msgLogin", e.message, "danger");
        }
    }
});

  // LOGOUT
  document.getElementById("btnLogout")?.addEventListener("click", () => {
    User.logout();

    // Mostra a modal
    const modal = document.getElementById("modalLogoutSuccess");
    modal.classList.remove("hidden");
    modal.classList.add("flex"); // aplica flex para centralizar

    // Opcional: bloquear scroll de fundo
    document.body.classList.add("overflow-hidden");
  });

  // Fechar a modal ao clicar em "OK"
  document.getElementById("closeLogoutModal")?.addEventListener("click", () => {
    const modal = document.getElementById("modalLogoutSuccess");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");

    // Opcional: recarregar página depois de fechar
    location.reload();
  });

  // MENSAGEM
  function displayMessage(modalId, message, type) {
    const modalElement = document.getElementById(modalId);
    if (!modalElement) return;
    const colorMap = {
      success: "green",
      danger: "red",
      warning: "yellow",
      info: "blue",
    };
    const color = colorMap[type] || "blue";
    modalElement.innerHTML = `
      <div class="flex items-center p-4 mb-4 text-sm text-${color}-800 rounded-lg bg-${color}-100" role="alert">
        <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9 5a1 1 0 112 0v4a1 1 0 11-2 0V5zm1 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
        </svg>
        <span class="sr-only">Info</span>
        <div>${message}</div>
      </div>
    `;
    setTimeout(() => {
      modalElement.innerHTML = "";
    }, 2500);
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
