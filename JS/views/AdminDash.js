import * as User from '../models/UserModel.js';

function renderDash() {
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
    const cards = summarySection.querySelectorAll('div[data-type]');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.getAttribute('data-type');
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
                // Aqui você pode redirecionar ou executar outra ação
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

// *** Mover displayUsers para fora de renderDash ***
function displayUsers() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const dataSection = document.getElementById("data-sections");

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

function openModal(username) {
  const user = User.getByUsername(username);

  if (user) {
    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.username;
    document.getElementById('userPassword').value = user.password;
    document.getElementById('userRole').value = user.role;
    document.getElementById('originalUsername').value = user.username;

    document.getElementById('userModal').classList.remove('hidden');
  }
}

document.getElementById('userForm')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const originalUsername = document.getElementById('originalUsername').value;
  const updatedName = document.getElementById('userName').value.trim();
  const updatedUsername = document.getElementById('userEmail').value.trim();
  const updatedPassword = document.getElementById('userPassword').value.trim();
  const updatedRole = document.getElementById('userRole').value;

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
  const username = document.getElementById('originalUsername').value;

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
