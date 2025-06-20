import * as User from "../models/UserModel.js";
import * as Tutor from "../models/TutorModel.js";
import *  as Course from "../models/CourseModel.js";
import * as Sessions from "../models/CommunityModel.js";

function renderDash() {
  Tutor.init();

  let aUser = User.getUserLogged();
  if (!aUser) {
    console.error("No user logged in");
    window.location.href = "/";
  }

  // Render user
  let gretSection = document.getElementById("welcome-section");
  gretSection.innerHTML = `
    <h1 class="text-xl font-extrabold text-gray-900 mb-2">Olá, ${aUser.name}!</h1>
    <p class="text-gray-600 text-md">Este é o seu painel de controle.</p>
    `;

  // Render summary
  let summarySection = document.getElementById("summary-cards");
  summarySection.innerHTML = `
    <div class="bg-white rounded-lg p-4 mb-4" data-type="users">
        <h2 class="text-lg font-semibold text-gray-900 mb-2">Users</h2>
        <p class="text-gray-600 text-sm">Aqui é onde você pode ver um resumo geral dos seus alunos.</p>
    </div>
    <div class="bg-white rounded-lg p-4 mb-4" data-type="tutors">
        <h2 class="text-lg font-semibold text-gray-900 mb-2">Tutors</h2>
        <p class="text-gray-600 text-sm">Aqui é onde você pode ver um resumo geral dos seus alunos.</p>
    </div>
    <div class="bg-white rounded-lg p-4 mb-4" data-type="courses">
        <h2 class="text-lg font-semibold text-gray-900 mb-2">Courses</h2>
        <p class="text-gray-600 text-sm">Aqui é onde você pode ver um resumo geral dos seus alunos.</p>
    </div>
    <div class="bg-white rounded-lg p-4 mb-4" data-type="sessions">
        <h2 class="text-lg font-semibold text-gray-900 mb-2">Sessions</h2>
        <p class="text-gray-600 text-sm">Aqui é onde você pode ver um resumo geral dos seus alunos.</p>
    </div>
    <div class="bg-white rounded-lg p-4 mb-4" data-type="community">
        <h2 class="text-lg font-semibold text-gray-900 mb-2">Community</h2>
        <p class="text-gray-600 text-sm">Aqui é onde você pode ver um resumo geral dos seus alunos.</p>
    </div>
    `;

  // Adiciona eventos de clique a cada cartão
  let cards = summarySection.querySelectorAll("div[data-type]");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      let type = card.getAttribute("data-type");
      handleCardClick(type);
    });
  });

  // Função para lidar com o clique no cartão
  function handleCardClick(type) {
    switch (type) {
      case "users":
        console.log("Users card clicked");
        displayUsers();
        break;
      case "tutors":
        console.log("Tutors card clicked");
        displayTutors();
        break;
      case "courses":
        console.log("Courses card clicked");
        displayCourses();
        break;
      case "sessions":
        console.log("Sessions card clicked");
        displaySessions();
        break;
      case "community":
        console.log("Community card clicked");
        displaCommunity();
        break;
      default:
        console.log("Unknown card clicked");
    }
  }
}
//final renderDash


//functions to display data
function displayUsers() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let dataSection = document.getElementById("data-sections");

  let userTable = `
  <div class="overflow-x-auto rounded-lg shadow border border-gray-200">
    <table class="min-w-full bg-white text-sm text-left">
      <thead class="bg-gray-100 text-gray-700 font-semibold">
        <tr>
          <th class="py-3 px-4 border-b">Nome</th>
          <th class="py-3 px-4 border-b">Ações</th>
        </tr>
      </thead>
      <tbody>
        ${users
          .map(
            (user) => `
          <tr class="odd:bg-gray-50 hover:bg-gray-100 transition-colors">
            <td class="py-3 px-4 border-b">${user.name}</td>
            <td class="py-3 px-4 border-b">
              <button class="text-blue-600 hover:underline font-medium edit-user-btn" data-username="${user.username}">
                Editar
              </button>
            </td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  </div>
`;

  dataSection.innerHTML = userTable;
  dataSection.classList.remove("hidden");

  // Adiciona eventos após renderizar
  document.querySelectorAll(".edit-user-btn").forEach((button) => {
    button.addEventListener("click", () => {
      openModal(button.dataset.username);
    });
  });
}

function displayTutors() {
  let tutors = Tutor.getTutors();
  console.log("Tutors encontrados:", tutors);
  if (!tutors || tutors.length === 0) {
    console.error("Nenhum tutor encontrado");
    tutors = localStorage.getItem("tutors")
      ? JSON.parse(localStorage.getItem("tutors"))
      : [];
  }
  let dataSection = document.getElementById("data-sections");

  let tutorTable = `
  <div class="overflow-x-auto rounded-lg shadow border border-gray-200">
    <table class="min-w-full bg-white text-sm text-left">
      <thead class="bg-gray-100 text-gray-700 font-semibold">
        <tr>
          <th class="py-3 px-4 border-b">Nome</th>
          <th class="py-3 px-4 border-b">Ações</th>
        </tr>
      </thead>
      <tbody>
        ${tutors
          .map(
            (tutor) => `
          <tr class="odd:bg-gray-50 hover:bg-gray-100 transition-colors">
            <td class="py-3 px-4 border-b">${tutor.name}</td>
            <td class="py-3 px-4 border-b">
              <button class="text-blue-600 hover:underline font-medium edit-tutor-btn" data-id="${tutor.id}">
                Editar
              </button>
            </td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  </div>
`;

  dataSection.innerHTML = tutorTable;
  dataSection.classList.remove("hidden");

  // Adiciona eventos depois de renderizar
  document.querySelectorAll(".edit-tutor-btn").forEach((button) => {
    button.addEventListener("click", () => {
      openTutorModal(button.dataset.id); // ← Correto agora
    });
  });
}

function displayCourses() {
  let courses = Course.getAll();
  console.log("Cursos encontrados:", courses);

  if (!courses || courses.length === 0) {
    console.error("Nenhum curso encontrado");
    courses = localStorage.getItem("courses")
      ? JSON.parse(localStorage.getItem("courses"))
      : [];
  }

  const dataSection = document.getElementById("data-sections");

  let courseTable = `
    <div class="overflow-x-auto rounded-lg shadow border border-gray-200">
      <table class="min-w-full bg-white text-sm text-left">
        <thead class="bg-gray-100 text-gray-700 font-semibold">
          <tr>
            <th class="py-3 px-4 border-b">Categoria</th>
            <th class="py-3 px-4 border-b">Nº Cursos</th>
            <th class="py-3 px-4 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          ${courses
            .map(
              (course) => `
            <tr class="odd:bg-gray-50 hover:bg-gray-100 transition-colors">
              <td class="py-3 px-4 border-b">${course.category}</td>
              <td class="py-3 px-4 border-b text-center">
                ${Array.isArray(course.count) ? course.count.length : course.count}
              </td>
              <td class="py-3 px-4 border-b">
                <button class="text-blue-600 hover:underline font-medium edit-course-btn" data-id="${course.id}">
                  Editar
                </button>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;

  dataSection.innerHTML = courseTable;
  dataSection.classList.remove("hidden");

  document.querySelectorAll(".edit-course-btn").forEach((button) => {
    button.addEventListener("click", () => {
      openCourseModal(button.dataset.id);
    });
  });
}

function displaySessions() {
  let dataSection = document.getElementById("data-sections");
  dataSection.innerHTML = `
  <div class="p-4">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Sessões</h2>
    <p class="text-gray-600">Esta funcionalidade ainda não está implementada.</p>
  </div>
  `;
  dataSection.classList.remove("hidden");
}

function displaCommunity() {
  let dataSection = document.getElementById("data-sections");
  dataSection.innerHTML = `
  <div class="p-4">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Comunidade</h2>
    <p class="text-gray-600">Esta funcionalidade ainda não está implementada.</p>
  </div>
  `;
  dataSection.classList.remove("hidden");
}

function openModal(username) {
  let user = User.getByUsername(username);
  console.log("User encontrado:", user);
  if (user) {
    document.getElementById("userName").value = user.name;
    document.getElementById("userEmail").value = user.username;
    document.getElementById("userPassword").value = user.password;
    document.getElementById("userRole").value = user.role;
    document.getElementById("originalUsername").value = user.username;

    document.getElementById("userModal").classList.remove("hidden");
  }
}

function openTutorModal(id) {
  let tutor = Tutor.getTutorById(Number(id));
  console.log("Tutor encontrado:", tutor);
  if (!tutor) return alert("Tutor não encontrado");

  document.getElementById("originalTutorId").value = tutor.id;
  document.getElementById("tutorName").value = tutor.name;
  document.getElementById("tutorGrade").value = tutor.grade;
  document.getElementById("tutorAvailability").value = tutor.availability;
  document.getElementById("tutorPrice").value = tutor.price;
  document.getElementById("tutorMode").value = tutor.mode;
  document.getElementById("tutorSubject").value = tutor.subject;
  document.getElementById("tutorPhoto").value = tutor.photo || "";
  document.getElementById("tutorDesc").value = tutor.desc || "";
  document.getElementById("tutorEmail").value = tutor.email;

  document.getElementById("tutorModal").classList.remove("hidden");
}

function openCourseModal(id) {
  let course = Course.getById(Number(id));
  console.log("Curso encontrado:", course);
  if (!course) return;

  document.getElementById("editCourseId").value = course.id;
  document.getElementById("editCourseCategory").value = course.category;

  document.getElementById("courseModal").classList.remove("hidden");
}

function displayCommunity() {
  let groups = getAll();
  console.log("Grupos encontrados:", groups);

  if (!groups || groups.length === 0) {
    console.error("Nenhum grupo encontrado");
    groups = localStorage.getItem("community")
      ? JSON.parse(localStorage.getItem("community"))
      : [];
  }

  const dataSection = document.getElementById("data-sections");

  let groupTable = `
    <div class="overflow-x-auto rounded-lg shadow border border-gray-200">
      <table class="min-w-full bg-white text-sm text-left">
        <thead class="bg-gray-100 text-gray-700 font-semibold">
          <tr>
            <th class="py-3 px-4 border-b">Título</th>
            <th class="py-3 px-4 border-b">Assunto</th>
            <th class="py-3 px-4 border-b">Descrição</th>
            <th class="py-3 px-4 border-b">Imagem</th>
            <th class="py-3 px-4 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          ${groups
            .map(
              (group) => `
            <tr class="odd:bg-gray-50 hover:bg-gray-100 transition-colors align-top">
              <td class="py-3 px-4 border-b">${group.title}</td>
              <td class="py-3 px-4 border-b">${group.subject}</td>
              <td class="py-3 px-4 border-b">${group.description}</td>
              <td class="py-3 px-4 border-b">
                <img src="${group.image}" alt="${group.title}" class="h-10 object-contain"/>
              </td>
              <td class="py-3 px-4 border-b">
                <button class="text-blue-600 hover:underline font-medium edit-community-btn" data-id="${group.id}">
                  Editar
                </button>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;

  dataSection.innerHTML = groupTable;
  dataSection.classList.remove("hidden");

  document.querySelectorAll(".edit-community-btn").forEach(button => {
    button.addEventListener("click", () => {
      openCommunityModal(button.dataset.id);
    });
  });
}

function openCommunityModal(id) {
  const group = getById(Number(id));
  if (!group) return;

  document.getElementById("editCommunityId").value = group.id;
  document.getElementById("editCommunityTitle").value = group.title;
  document.getElementById("editCommunityDescription").value = group.description;

  document.getElementById("communityModal").classList.remove("hidden");
}

//event listeners for buttons
// Form submit para update
document.getElementById("tutorForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  let originalId = document.getElementById("originalTutorId").value;
  let updatedTutor = {
    name: document.getElementById("tutorName").value.trim(),
    grade: document.getElementById("tutorGrade").value.trim(),
    availability: document.getElementById("tutorAvailability").value.trim(),
    price: parseFloat(document.getElementById("tutorPrice").value),
    mode: document.getElementById("tutorMode").value.trim(),
    subject: document.getElementById("tutorSubject").value.trim(),
    photo: document.getElementById("tutorPhoto").value.trim(),
    desc: document.getElementById("tutorDesc").value.trim(),
    email: document.getElementById("tutorEmail").value.trim(),
  };

  try {
    Tutor.update(originalId, updatedTutor);
    alert("Tutor atualizado com sucesso!");
    document.getElementById("tutorModal").classList.add("hidden");
    displayTutors();
  } catch (err) {
    alert("Erro: " + err.message);
  }
});

// Botão fechar modal tutor
document.getElementById("closeTutorModal").addEventListener("click", () => {
  document.getElementById("tutorModal").classList.add("hidden");
});

// Botão para eliminar tutor
document.getElementById("deleteTutor")?.addEventListener("click", () => {
  let id = document.getElementById("originalTutorId").value;

  if (confirm("Tem certeza que deseja eliminar este tutor?")) {
    try {
      Tutor.removeTutor(id);
      alert("Tutor eliminado com sucesso!");
      document.getElementById("tutorModal").classList.add("hidden");
      displayTutors();
    } catch (err) {
      alert("Erro: " + err.message);
    }
  }
});

// Fechar modal
document.getElementById("closeTutorModal")?.addEventListener("click", () => {
  document.getElementById("tutorModal").classList.add("hidden");
});

document.getElementById("userForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  let originalUsername = document.getElementById("originalUsername").value;
  let updatedName = document.getElementById("userName").value.trim();
  let updatedUsername = document.getElementById("userEmail").value.trim();
  let updatedPassword = document.getElementById("userPassword").value.trim();
  let updatedRole = document.getElementById("userRole").value;

  if (!updatedName || !updatedUsername || !updatedPassword) {
    alert("Por favor preencha todos os campos.");
    return;
  }

  try {
    User.update(originalUsername, {
      name: updatedName,
      username: updatedUsername,
      password: updatedPassword,
      role: updatedRole,
    });

    alert("Utilizador atualizado com sucesso.");
    document.getElementById("userModal").classList.add("hidden");
    displayUsers();
  } catch (err) {
    alert("Erro ao atualizar: " + err.message);
  }
});

document.getElementById("closeModal")?.addEventListener("click", () => {
  document.getElementById("userModal").classList.add("hidden");
});

document.getElementById("deleteUser")?.addEventListener("click", () => {
  let username = document.getElementById("originalUsername").value;

  if (confirm("Tem a certeza que deseja eliminar este utilizador?")) {
    try {
      User.remove(username);
      alert("Utilizador removido com sucesso.");
      document.getElementById("userModal").classList.add("hidden");
      displayUsers();
    } catch (err) {
      alert("Erro ao eliminar: " + err.message);
    }
  }
});

document.getElementById("cancelEdit").addEventListener("click", () => {
  document.getElementById("courseModal").classList.add("hidden");
});

document.getElementById("editCourseForm").addEventListener("submit", (e) => {
  e.preventDefault();

  let id = Number(document.getElementById("editCourseId").value);
  let category = document.getElementById("editCourseCategory").value.trim();

  if (category) {
    Course.update(id, { category }); // apenas o nome
    document.getElementById("courseModal").classList.add("hidden");
    displayCourses();
  }
});

document.getElementById("cancelEdit").addEventListener("click", () => {
  document.getElementById("courseModal").classList.add("hidden");
});

document.getElementById("cancelCommunityEdit").addEventListener("click", () => {
  document.getElementById("communityModal").classList.add("hidden");
});

document.getElementById("editCommunityForm").addEventListener("submit", e => {
  e.preventDefault();

  const id = Number(document.getElementById("editCommunityId").value);
  const title = document.getElementById("editCommunityTitle").value.trim();
  const description = document.getElementById("editCommunityDescription").value.trim();

  if (title && description) {
    update(id, { title, description });
    document.getElementById("communityModal").classList.add("hidden");
    displayCommunity();
  }
});

renderDash();
