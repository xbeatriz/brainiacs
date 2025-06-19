import * as User from "../models/UserModel.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded disparado");
  renderDash();
});

export function renderDash() {
  console.log("renderDash iniciado");
  const lUser = User.getUserLogged();
  console.log("Usuário logado:", lUser);

  if (!lUser) {
    console.error("Nenhum usuário logado.");
    location.href = "/";
    return;
  }

  const gretSection = document.getElementById("greeting-section");
  if (!gretSection) {
    console.error("Elemento greeting-section não encontrado no DOM");
    return;
  }
  gretSection.innerHTML = `
    <h1 class="text-xl font-extrabold text-gray-900 mb-2">Olá, ${lUser.name}!</h1>
    <p class="text-gray-600 text-md">Este é o seu painel de controle.</p>
  `;

  renderSessionCards();
  renderCommunities();
}

function renderSessionCards() {
  console.log("renderSessionCards iniciado");
  const cardContainer = document.getElementById("cards-container");
  if (!cardContainer) {
    console.error("Elemento cards-container não encontrado no DOM");
    return;
  }
  cardContainer.innerHTML = "";

  const sessionsRaw = localStorage.getItem("mySessions");
  const sessions = JSON.parse(sessionsRaw) || [];

  if (sessions.length === 0) {
    console.log("Nenhuma sessão encontrada");
    cardContainer.innerHTML = `<p class="text-gray-500">Nenhuma sessão agendada.</p>`;
    return;
  }

  sessions.forEach((session) => {
    console.log("Renderizando sessão:", session);

    const isDone = session.done === true;
    const card = document.createElement("div");
    card.className = "bg-white p-6 rounded-lg shadow-md flex flex-col justify-between";

    card.innerHTML = `
      <div>
        <h3 class="text-lg font-semibold text-orange-500 mb-2">📚 Sessão com ${session.tutorName}</h3>
        <p><strong>Data:</strong> ${session.date}</p>
        <p><strong>Hora:</strong> ${session.time}</p>
        <p><strong>Mensagem:</strong> ${session.message || "Sem mensagem."}</p>
      </div>
      <div class="flex justify-between items-center mt-4">
        <button class="${isDone ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300"} mt-4 px-4 py-2 rounded-lg flex items-center justify-center gap-2 btn-toggle-done" data-id="${session.id}">
          ${isDone ? "✔️ Concluída" : "Marcar como feita"}
        </button>
        <button class="text-red-600 hover:underline text-sm btn-cancel-session" data-id="${session.id}">
          Desmarcar
        </button>
      </div>
    `;

    // Adiciona eventos individualmente para os botões de cada card
    const toggleBtn = card.querySelector(".btn-toggle-done");
    toggleBtn.addEventListener("click", () => toggleSessionDone(session.id));

    const cancelBtn = card.querySelector(".btn-cancel-session");
    cancelBtn.addEventListener("click", () => cancelSession(session.id));

    cardContainer.appendChild(card);
  });
}

window.toggleSessionDone = function(id) {
  console.log("toggleSessionDone chamado com id:", id);

  let sessions = JSON.parse(localStorage.getItem("mySessions")) || [];

  sessions = sessions.map(session => {
    if (!session.id) session.id = crypto.randomUUID(); // garante id
    if (session.id === id) {
      session.done = !session.done; // alterna entre true/false
      console.log(`Sessão ${id} alterada para done = ${session.done}`);
    }
    return session;
  });

  localStorage.setItem("mySessions", JSON.stringify(sessions));
  console.log("Sessions atualizadas e salvas:", sessions);

  renderSessionCards();
};

window.cancelSession = function(id) {
  console.log("cancelSession chamado com id:", id);

  let sessions = JSON.parse(localStorage.getItem("mySessions")) || [];

  // Remove a sessão pelo id
  sessions = sessions.filter(session => session.id !== id);

  localStorage.setItem("mySessions", JSON.stringify(sessions));
  console.log("Sessions atualizadas após remoção:", sessions);

  renderSessionCards();
};


function renderCommunities() {
  console.log("renderCommunities iniciado");
  const container = document.getElementById("community-container");
  if (!container) {
    console.error("Elemento community-container não encontrado no DOM");
    return;
  }
  const communitiesRaw = localStorage.getItem("myCommunities");
  console.log("myCommunities do localStorage:", communitiesRaw);
  const communities = JSON.parse(communitiesRaw) || [];

  if (communities.length === 0) {
    console.log("Nenhuma comunidade encontrada");
    container.innerHTML = `<p class="text-gray-500">Você ainda não participa de nenhuma comunidade.</p>`;
    return;
  }

  container.innerHTML = "";

  communities.forEach((com) => {
    console.log("Renderizando comunidade:", com);
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded-lg shadow-md";

    card.innerHTML = `
      <h3 class="text-lg font-semibold text-orange-500 mb-2">👥 ${com.name}</h3>
      <p class="text-sm text-gray-600">${com.description}</p>
    `;

    container.appendChild(card);
  });
}
