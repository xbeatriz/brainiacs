import * as User from '../models/UserModel.js';
import * as View from '../components/CourseCard.js';

export function renderDash() {
  const lUser = User.getUserLogged();

  if (!lUser) {
    console.error("No user logged in");
    window.location.href = "/";
    return;
  }

  // Saudação
  const gretSection = document.getElementById("greeting-section");
  gretSection.innerHTML = `
    <h1 class="text-xl font-extrabold text-gray-900 mb-2">Olá, ${lUser.name}!</h1>
    <p class="text-gray-600 text-md">Este é o seu painel de controle.</p>
  `;

  renderSessionCards();
}

function renderSessionCards() {
  const cardContainer = document.getElementById("cards-container");
  if (!cardContainer) {
    console.error("Card container not found");
    return;
  }

  // Limpa se já tiver conteúdo
  cardContainer.innerHTML = "";

  const sessions = JSON.parse(localStorage.getItem("mySessions")) || [];

  if (sessions.length === 0) {
    const noData = document.createElement("p");
    noData.textContent = "Nenhuma sessão agendada.";
    noData.className = "text-gray-500";
    cardContainer.appendChild(noData);
    return;
  }

  // Cria um card para cada sessão
  sessions.forEach((session) => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded-lg shadow-md";

    card.innerHTML = `
      <h3 class="text-lg font-semibold text-orange-500 mb-2">📚 Sessão com ${session.tutorName}</h3>
      <p><strong>Data:</strong> ${session.date}</p>
      <p><strong>Hora:</strong> ${session.time}</p>
      <p><strong>Mensagem:</strong> ${session.message || "Sem mensagem."}</p>
    `;

    cardContainer.appendChild(card);
  });
}



document.addEventListener("DOMContentLoaded", renderDash);
