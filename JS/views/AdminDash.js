import * as User from '../models/UserModel.js';
import * as Tutor from '../models/TutorModel.js';

function renderDash() {

    Tutor.init();

    let aUser  = User.getUserLogged();
    if (!aUser ) {
        console.error("No user logged in");
        window.location.href = "/";
    }

    // Render user
    let gretSection = document.getElementById("welcome-section");
    gretSection.innerHTML = `
    <h1 class="text-xl font-extrabold text-gray-900 mb-2">Olá, ${aUser .name}!</h1>
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
    let cards = summarySection.querySelectorAll('div[data-type]');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            let type = card.getAttribute('data-type');
            handleCardClick(type);
        });
    });

    // Função para lidar com o clique no cartão
    function handleCardClick(type) {
        switch (type) {
            case 'users':
                console.log('Users card clicked');
                displayUsers();
                break;
            case 'tutors':
                console.log('Tutors card clicked');
                displayTutors();
                break;
            case 'courses':
                console.log('Courses card clicked');
                // Aqui você pode redirecionar ou executar outra ação
                break;
            case 'sessions':
                console.log('Sessions card clicked');
                // Aqui você pode redirecionar ou executar outra ação
                break;
            case 'community':
                console.log('Community card clicked');
                // Aqui você pode redirecionar ou executar outra ação
                break;
            default:
                console.log('Unknown card clicked');
          }
  }
}
//final renderDash

function displayUsers() {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let dataSection = document.getElementById("data-sections");

  let userTable = `
    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="py-2">Nome</th>
          <th class="py-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        ${users.map(user => `
          <tr>
            <td class="py-2">${user.name}</td>
            <td class="py-2">
              <button class="text-blue-500 edit-user-btn" data-username="${user.username}">Editar</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  dataSection.innerHTML = userTable;
  dataSection.classList.remove('hidden');

  // Adiciona eventos após renderizar
  document.querySelectorAll('.edit-user-btn').forEach(button => {
    button.addEventListener('click', () => {
      openModal(button.dataset.username);
    });
  });
}

function displayTutors() {
  let tutors = Tutor.getTutors();
  console.log("Tutors encontrados:", tutors);
    if (!tutors || tutors.length === 0) {
    console.error("Nenhum tutor encontrado");
    tutors = localStorage.getItem('tutors') ? JSON.parse(localStorage.getItem('tutors')) : [];
  }
  let dataSection = document.getElementById("data-sections");
    
  let tutorTable = `
    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="py-2">Nome</th>
          <th class="py-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        ${tutors.map(tutor => `
          <tr>
            <td class="py-2">${tutor.name}</td>
            <td class="py-2">
              <button class="text-blue-500 edit-tutor-btn" data-id="${tutor.id}">Editar</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  dataSection.innerHTML = tutorTable;
  dataSection.classList.remove('hidden');

  // Adiciona eventos depois de renderizar
  document.querySelectorAll('.edit-tutor-btn').forEach(button => {
  button.addEventListener('click', () => {
    openTutorModal(button.dataset.id); // ← Correto agora
  });
});

}

function openModal(username) {
  let user = User.getByUsername(username);
    console.log("User encontrado:", user);
  if (user) {
    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.username;
    document.getElementById('userPassword').value = user.password;
    document.getElementById('userRole').value = user.role;
    document.getElementById('originalUsername').value = user.username;

    document.getElementById('userModal').classList.remove('hidden');
  }
}

function openTutorModal(id) {
  let tutor = Tutor.getTutorById(Number(id));
    console.log("Tutor encontrado:", tutor);
  if (!tutor) return alert("Tutor não encontrado");

  document.getElementById('originalTutorId').value = tutor.id;
  document.getElementById('tutorName').value = tutor.name;
  document.getElementById('tutorGrade').value = tutor.grade;
  document.getElementById('tutorAvailability').value = tutor.availability;
  document.getElementById('tutorPrice').value = tutor.price;
  document.getElementById('tutorMode').value = tutor.mode;
  document.getElementById('tutorSubject').value = tutor.subject;
  document.getElementById('tutorPhoto').value = tutor.photo || "";
  document.getElementById('tutorDesc').value = tutor.desc || "";
  document.getElementById('tutorEmail').value = tutor.email;

  document.getElementById('tutorModal').classList.remove('hidden');
}

// Form submit para update
document.getElementById('tutorForm')?.addEventListener('submit', e => {
  e.preventDefault();

  let originalId = document.getElementById('originalTutorId').value;
  let updatedTutor = {
    name: document.getElementById('tutorName').value.trim(),
    grade: document.getElementById('tutorGrade').value.trim(),
    availability: document.getElementById('tutorAvailability').value.trim(),
    price: parseFloat(document.getElementById('tutorPrice').value),
    mode: document.getElementById('tutorMode').value.trim(),
    subject: document.getElementById('tutorSubject').value.trim(),
    photo: document.getElementById('tutorPhoto').value.trim(),
    desc: document.getElementById('tutorDesc').value.trim(),
    email: document.getElementById('tutorEmail').value.trim(),
  };

  try {
    Tutor.update(originalId, updatedTutor);
    alert("Tutor atualizado com sucesso!");
    document.getElementById('tutorModal').classList.add('hidden');
    displayTutors();
  } catch (err) {
    alert("Erro: " + err.message);
  }
});

// Botão fechar modal tutor
document.getElementById('closeTutorModal').addEventListener('click', () => {
  document.getElementById('tutorModal').classList.add('hidden');
});

// Botão para eliminar tutor
document.getElementById('deleteTutor')?.addEventListener('click', () => {
  let id = document.getElementById('originalTutorId').value;

  if (confirm("Tem certeza que deseja eliminar este tutor?")) {
    try {
      Tutor.removeTutor(id);
      alert("Tutor eliminado com sucesso!");
      document.getElementById('tutorModal').classList.add('hidden');
      displayTutors();
    } catch (err) {
      alert("Erro: " + err.message);
    }
  }
});

// Fechar modal
document.getElementById('closeTutorModal')?.addEventListener('click', () => {
  document.getElementById('tutorModal').classList.add('hidden');
});

document.getElementById('userForm')?.addEventListener('submit', (e) => {
  e.preventDefault();

  let originalUsername = document.getElementById('originalUsername').value;
  let updatedName = document.getElementById('userName').value.trim();
  let updatedUsername = document.getElementById('userEmail').value.trim();
  let updatedPassword = document.getElementById('userPassword').value.trim();
  let updatedRole = document.getElementById('userRole').value;

  if (!updatedName || !updatedUsername || !updatedPassword) {
    alert("Por favor preencha todos os campos.");
    return;
  }

  try {
    User.update(originalUsername, {
      name: updatedName,
      username: updatedUsername,
      password: updatedPassword,
      role: updatedRole
    });

    alert("Utilizador atualizado com sucesso.");
    document.getElementById('userModal').classList.add('hidden');
    displayUsers();
  } catch (err) {
    alert("Erro ao atualizar: " + err.message);
  }
});

document.getElementById('closeModal')?.addEventListener('click', () => {
  document.getElementById('userModal').classList.add('hidden');
});

document.getElementById('deleteUser')?.addEventListener('click', () => {
  let username = document.getElementById('originalUsername').value;

  if (confirm("Tem a certeza que deseja eliminar este utilizador?")) {
    try {
      User.remove(username);
      alert("Utilizador removido com sucesso.");
      document.getElementById('userModal').classList.add('hidden');
      displayUsers();
    } catch (err) {
      alert("Erro ao eliminar: " + err.message);
    }
  }
});

renderDash();