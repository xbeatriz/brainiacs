import { createCourseCard } from "/JS/components/CourseCard.js";
import { createCommunityCard } from "/JS/components/CommunityCard.js";
import { renderNavbar } from "./views/NavbarView.js";
import { renderFooter } from "./views/FooterView.js";
import { styleButtons } from "./components/button.js";
import * as Tutor from "./models/TutorModel.js";

const coursesContainer = document.getElementById("courses-container");
const filterForm = document.getElementById("filterForm");
// Render Navbar and Footer
renderNavbar();
renderFooter();

const allTutors = JSON.parse(localStorage.getItem("tutors")) || [];

const container = document.getElementById("courses-container");
container.innerHTML = ""; // Limpa conteúdo anterior

// Alterna os botões (online / nearby)
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((b) => {
      b.classList.remove("bg-orange-500", "text-white");
      b.classList.add("bg-orange-100", "text-orange-600");
    });
    btn.classList.add("bg-orange-500", "text-white");
    btn.classList.remove("bg-orange-100", "text-orange-600");
  });
});

// Evento do formulário
filterForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const filters = {
    subject: document.getElementById("txtSubject").value.toLowerCase(),
    grade: document.getElementById("sltGrade").value,
    availability: document.getElementById("sltAvailability").value,
    price: parseInt(document.getElementById("sltPrice").value) || Infinity,
    location: document.getElementById("sltLocation").value,
    radius: parseInt(document.getElementById("sltRadius").value) || Infinity,
    mode: document
      .getElementById("btn-online")
      .classList.contains("bg-orange-500")
      ? "online"
      : "nearby",
  };

  // Filtrar explicadores
  const filtered = allTutors.filter((tutor) => {
    return (
      (filters.subject === "" ||
        tutor.subject.toLowerCase().includes(filters.subject)) &&
      (filters.grade === "" || tutor.grade === filters.grade) &&
      (filters.availability === "" ||
        tutor.availability === filters.availability) &&
      (filters.location === "" || tutor.location === filters.location) &&
      tutor.price <= filters.price &&
      (filters.mode === "" || tutor.mode === filters.mode)
    );
  });

  // Mostrar resultados
  renderTutors(filtered);
});

function renderTutors(tutors) {
  Tutor.init();

  const coursesContainer = document.getElementById("courses-container");
  coursesContainer.innerHTML = "";

  if (tutors.length === 0) {
    coursesContainer.innerHTML = `<p class="col-span-full text-center text-gray-500">No tutors found. Try adjusting your filters.</p>`;
    return;
  }

  tutors.forEach((tutor) => {
    const card = document.createElement("div");
    card.className = `
      max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-sm 
      flex flex-col text-left overflow-hidden
    `;

    card.innerHTML = `
  <a href="#">
    <img 
      class="w-full h-32 object-cover rounded-t-lg" 
      src="${tutor.photo}" 
      alt="${tutor.name}" 
    />
  </a>
  <div class="px-4 py-3">
    <a href="#">
      <h5 class="tutorName text-lg font-semibold text-gray-900 truncate" data-id="${
        tutor.id
      }">${tutor.name}</h5>
    </a>
    <p class="text-sm font-medium text-orange-600 mt-1">${tutor.subject} (${
      tutor.grade
    })</p>
    <p class="text-sm text-gray-700 mt-1 line-clamp-2">${tutor.desc || ""}</p>
    <p class="text-xs italic text-gray-500 mt-1">
      ${tutor.availability} • ${tutor.location} • ${
      tutor.mode === "online" ? "Online" : "Presencial"
    }
    </p>
    <p class="text-sm font-bold text-orange-600 mt-2">€${tutor.price} / hora</p>
  </div>
`;

    coursesContainer.appendChild(card);
  });

  // CLICAR NO H5 COM NOME DO TUTOR
  const btnsSeeMore = document.getElementsByClassName("tutorName");
  for (const button of btnsSeeMore) {
    button.addEventListener("click", () => {
      Tutor.setCurrentTutor(button.id);
      location.href = "./html/tutor.html";
    });
  }
}

// Renderizar todos no início
renderTutors(allTutors);

function displayCommunity() {
  const container = document.getElementById("community-container");
  if (!container) return;

  const communityGroups = JSON.parse(localStorage.getItem("community")) || [];

  communityGroups.forEach((group) => {
    const card = createCommunityCard({
      image: group.image,
      title: group.title,
      subject: group.subject,
      description: group.description,
    });
    container.appendChild(card);
  });
}

// Event Listeners

document.addEventListener("DOMContentLoaded", () => {
  displayCommunity();
});

// Toggle menu mobile
document.addEventListener("click", function (e) {
  const toggleButton = e.target.closest("[data-collapse-toggle]");
  if (!toggleButton) return;

  const targetId = toggleButton.getAttribute("data-collapse-toggle");
  const menu = document.getElementById(targetId);
  if (!menu) return;

  const expanded = toggleButton.getAttribute("aria-expanded") === "true";
  toggleButton.setAttribute("aria-expanded", !expanded);
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
  } else {
    menu.classList.add("hidden");
  }
});

// Toggle dropdown avatar
document.addEventListener("click", function (e) {
  const userButton = e.target.closest("#user-menu-button");
  const dropdown = document.getElementById("user-dropdown");
  if (!userButton) {
    // Se clicou fora do botão do usuário, fecha o dropdown
    if (dropdown && !dropdown.classList.contains("hidden")) {
      dropdown.classList.add("hidden");
      userButton?.setAttribute("aria-expanded", "false");
    }
    return;
  }

  const expanded = userButton.getAttribute("aria-expanded") === "true";
  userButton.setAttribute("aria-expanded", !expanded);

  if (dropdown.classList.contains("hidden")) {
    dropdown.classList.remove("hidden");
  } else {
    dropdown.classList.add("hidden");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  styleButtons();
});
