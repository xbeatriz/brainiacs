import * as User from "../models/UserModel.js";

document.addEventListener("DOMContentLoaded", () => {
  renderDash();
});

export function renderDash() {
  const lUser = User.getUserLogged();

  if (!lUser) {
    location.href = "/";
    return;
  }

  const gretSection = document.getElementById("greeting-section");
  if (!gretSection) return;
  
  gretSection.innerHTML = `
    <h1 class="text-xl font-extrabold text-gray-900 mb-2">Olá, ${lUser.name}!</h1>
    <p class="text-gray-600 text-md">Este é o seu painel de controle.</p>
  `;

  renderSessionCards();
  renderCommunities();
}

function renderSessionCards() {
  const cardContainer = document.getElementById("cards-container");
  if (!cardContainer) return;
  cardContainer.innerHTML = "";

  const sessions = JSON.parse(localStorage.getItem("mySessions")) || [];

  if (sessions.length === 0) {
    cardContainer.innerHTML = `<p class="text-gray-500">Nenhuma sessão agendada.</p>`;
    return;
  }

  const doneCount = sessions.filter(s => s.done === true).length;
  const pendingSessions = sessions.filter(s => !s.done);
  const doneSessions = sessions.filter(s => s.done);

  const summaryLine = document.createElement("p");
  summaryLine.className = "text-gray-700 font-semibold mb-4";
  summaryLine.textContent = `Você concluiu ${doneCount} ${doneCount === 1 ? "sessão" : "sessões"}.`;
  cardContainer.appendChild(summaryLine);

  // Cria uma seção para pendentes
  const pendingSection = document.createElement("div");
  pendingSection.className = "mb-6";
  const pendingTitle = document.createElement("h2");
  pendingTitle.textContent = "Sessões Pendentes";
  pendingTitle.className = "text-lg font-semibold mb-3 text-orange-500";
  pendingSection.appendChild(pendingTitle);

  pendingSessions.forEach(session => {
    pendingSection.appendChild(createCard(session, false));
  });

  cardContainer.appendChild(pendingSection);

  // Cria uma seção para concluídas
  const doneSection = document.createElement("div");
  const doneTitle = document.createElement("h2");
  doneTitle.textContent = "Sessões Concluídas";
  doneTitle.className = "text-lg font-semibold mb-3 text-green-600";
  doneSection.appendChild(doneTitle);

  doneSessions.forEach(session => {
    doneSection.appendChild(createCard(session, true));
  });

  cardContainer.appendChild(doneSection);

  // Ativa eventos nos botões após renderização
  const toggleButtons = document.querySelectorAll(".btn-toggle-done");
  toggleButtons.forEach((btn) => {
    const id = btn.dataset.id;
    btn.addEventListener("click", () => toggleSessionDone(id));
  });

  const cancelButtons = document.querySelectorAll(".btn-cancel-session");
  cancelButtons.forEach((btn) => {
    const id = btn.dataset.id;
    btn.addEventListener("click", () => cancelSession(id));
  });
}

function createCard(session, isDone) {
  const btnClass = isDone
    ? "mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
    : "mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center justify-center gap-2";

  const card = document.createElement("div");
  card.className = `bg-white p-6 rounded-lg shadow-md flex flex-col justify-between ${
    isDone ? "opacity-60" : ""
  }`;

  card.innerHTML = `
    <div>
      <h3 class="text-lg font-semibold text-orange-500 mb-2">📚 Sessão com ${session.tutorName}</h3>
      <p><strong>Data:</strong> ${session.date}</p>
      <p><strong>Hora:</strong> ${session.time}</p>
      <p><strong>Mensagem:</strong> ${session.message || "Sem mensagem."}</p>
    </div>
    <div class="flex justify-between items-center mt-4">
      <button data-id="${session.id}" class="${btnClass} btn-toggle-done">
        ${isDone ? "✔️ Concluída" : "Marcar como feita"}
      </button>
      <button data-id="${session.id}" class="text-red-600 hover:underline text-sm btn-cancel-session">
        Desmarcar
      </button>
    </div>
  `;
  return card;
}



window.toggleSessionDone = function(id) {
  let sessions = JSON.parse(localStorage.getItem("mySessions")) || [];

  sessions = sessions.map(session => {
    if (!session.id) session.id = crypto.randomUUID();
    if (session.id === id) {
      session.done = !session.done;
    }
    return session;
  });

  localStorage.setItem("mySessions", JSON.stringify(sessions));
  renderSessionCards();
};

window.cancelSession = function(id) {
  let sessions = JSON.parse(localStorage.getItem("mySessions")) || [];

  sessions = sessions.filter(session => session.id !== id);

  localStorage.setItem("mySessions", JSON.stringify(sessions));
  renderSessionCards();
};

function renderCommunities() {
  const container = document.getElementById("community-container");
  if (!container) return;

  const communities = JSON.parse(localStorage.getItem("myCommunities")) || [];

  if (communities.length === 0) {
    container.innerHTML = `<p class="text-gray-500">Você ainda não participa de nenhuma comunidade.</p>`;
    return;
  }

  container.innerHTML = "";

  communities.forEach(com => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded-lg shadow-md";

    card.innerHTML = `
      <h3 class="text-lg font-semibold text-orange-500 mb-2">👥 ${com.name}</h3>
      <p class="text-sm text-gray-600">${com.description}</p>
    `;

    container.appendChild(card);
  });
}
