import { createCourseCard } from "/JS/components/CourseCard.js";
import { createCommunityCard } from "/JS/components/CommunityCard.js";
import { renderNavbar } from "./views/NavbarView.js";
import { renderFooter } from "./views/FooterView.js";
import { styleButtons } from "./components/button.js";
import * as Tutor from "./models/TutorModel.js";
import * as CommunityModule from "./models/CommunityModel.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");

  // Navbar e Footer em todas as páginas
  renderNavbar();
  renderFooter();
  styleButtons();

  // FORMULÁRIO DE REGISTRO DE TUTOR
  const frmRegisterTutor = document.getElementById("frmRegisterTutor");
  if (frmRegisterTutor) {
    frmRegisterTutor.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("Form submitted!");
      const msgRegister = document.getElementById("msgRegister");
      if (msgRegister) {
        msgRegister.textContent = "Form submit detected.";
      }
    });
  }

  // PÁGINA DE CURSOS / TUTORES
  const coursesContainer = document.getElementById("courses-container");
  const filterForm = document.getElementById("filterForm");

  if (coursesContainer && filterForm) {
    const allTutors = JSON.parse(localStorage.getItem("tutors")) || [];

    function renderTutors(tutors) {
      Tutor.init();
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
            <img class="w-full h-32 object-cover rounded-t-lg" src="${tutor.photo}" alt="${tutor.name}" />
          </a>
          <div class="px-4 py-3">
            <a href="#">
              <h5 class="tutorName text-lg font-semibold text-gray-900 truncate" data-id="${tutor.id}">
                ${tutor.name}
              </h5>
            </a>
            <p class="text-sm font-medium text-orange-600 mt-1">${tutor.subject} (${tutor.grade})</p>
            <p class="text-sm text-gray-700 mt-1 line-clamp-2">${tutor.desc || ""}</p>
            <p class="text-xs italic text-gray-500 mt-1">
              ${tutor.availability} • ${tutor.location} • ${tutor.mode === "online" ? "Online" : "Presencial"}
            </p>
            <p class="text-sm font-bold text-orange-600 mt-2">€${tutor.price} / hora</p>
          </div>
        `;

        coursesContainer.appendChild(card);

        const nameElement = card.querySelector(".tutorName");
        nameElement.addEventListener("click", () => {
          Tutor.setCurrentTutor(tutor);
          location.href = "/html/tutor.html";
        });
      });
    }

    renderTutors(allTutors);

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

      const filtered = allTutors.filter((tutor) => {
        return (
          (filters.subject === "" || tutor.subject.toLowerCase().includes(filters.subject)) &&
          (filters.grade === "" || tutor.grade === filters.grade) &&
          (filters.availability === "" || tutor.availability === filters.availability) &&
          (filters.location === "" || tutor.location === filters.location) &&
          tutor.price <= filters.price &&
          (filters.mode === "" || tutor.mode === filters.mode)
        );
      });

      renderTutors(filtered);
    });
  }

  // PÁGINA DE COMUNIDADE
  const communityContainer = document.getElementById("community-container");
 if (communityContainer && communityFilterForm) {
  const communities = CommunityModule.getAll();

  function renderCommunities(filtered) {
    communityContainer.innerHTML = "";
    if (filtered.length === 0) {
      communityContainer.innerHTML = `<p class="col-span-full text-center text-gray-500">No community groups found.</p>`;
      return;
    }

    filtered.forEach((group) => {
      const card = document.createElement("div");
      card.className = "bg-white p-6 rounded-2xl shadow flex flex-col";

      card.innerHTML = `
        <img src="${group.image}" alt="${group.title}" class="w-full h-40 object-cover rounded-lg mb-4" />
        <h3 class="text-lg font-semibold mb-2">${group.title}</h3>
        <p class="text-sm text-gray-500 mb-2">${group.subject}</p>
        <p class="text-sm text-gray-700 mb-4 flex-grow">${group.description}</p>
        <button class="mt-auto bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 join-btn" data-id="${group.id}">
          Join
        </button>
      `;

      communityContainer.appendChild(card);
    });
  }

  // Renderizar todos ao carregar
  renderCommunities(communities);

  // Escuta submit do form
  communityFilterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = e.target.communityName.value.toLowerCase();
    const location = e.target.communityLocation.value.toLowerCase();
    const subject = e.target.communitySubject.value;

    const filtered = communities.filter((group) => {
      return (
        (name === "" || group.title.toLowerCase().includes(name)) &&
        (location === "" || (group.location?.toLowerCase().includes(location) ?? false)) &&
        (subject === "" || group.subject === subject)
      );
    });

    renderCommunities(filtered);
  });
}

  // MENU MOBILE TOGGLE
  document.addEventListener("click", function (e) {
    const toggleButton = e.target.closest("[data-collapse-toggle]");
    if (!toggleButton) return;

    const targetId = toggleButton.getAttribute("data-collapse-toggle");
    const menu = document.getElementById(targetId);
    if (!menu) return;

    const expanded = toggleButton.getAttribute("aria-expanded") === "true";
    toggleButton.setAttribute("aria-expanded", !expanded);
    menu.classList.toggle("hidden");
  });

  // DROPDOWN AVATAR TOGGLE
  document.addEventListener("click", function (e) {
    const userButton = e.target.closest("#user-menu-button");
    const dropdown = document.getElementById("user-dropdown");

    if (!userButton && dropdown && !dropdown.classList.contains("hidden")) {
      dropdown.classList.add("hidden");
      document.getElementById("user-menu-button")?.setAttribute("aria-expanded", "false");
      return;
    }

    if (userButton && dropdown) {
      const expanded = userButton.getAttribute("aria-expanded") === "true";
      userButton.setAttribute("aria-expanded", !expanded);
      dropdown.classList.toggle("hidden");
    }
  });
});
