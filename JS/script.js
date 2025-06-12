import { createCourseCard } from '/JS/components/CourseCard.js';
import { createCommunityCard } from '/JS/components/CommunityCard.js';
import { renderNavbar } from './views/NavbarView.js';
import { renderFooter} from './views/FoterView.js'

// Render Navbar and Footer
renderNavbar();
renderFooter();


let hasCheckedRole = false; // Flag para verificar se já foi feita a verificação
document.addEventListener('DOMContentLoaded', () => {
  // Verifica se já foi feita a verificação
  if (!hasCheckedRole) {
    const role = localStorage.getItem('role');
    const currentUrl = window.location.href;
    if (role === 'estudante' && !currentUrl.includes('istudent.html')) {
      window.location.href = './html/istudent.html';
      return; // interrompe execução para evitar setar listeners
    }
    if (role === 'tutor' && !currentUrl.includes('itutor.html')) {
      window.location.href = './html/itutor.html';
      return;
    }
    hasCheckedRole = true; // Marca que a verificação foi feita
  }
  // Seleciona os botões por id
  const estudanteBtn = document.getElementById('btn-estudante');
  const tutorBtn = document.getElementById('btn-tutor');
  if (estudanteBtn) {
    estudanteBtn.addEventListener('click', () => {
      localStorage.setItem('role', 'estudante');
      window.location.href = '/html/istudent.html';
    });
  }
  if (tutorBtn) {
    tutorBtn.addEventListener('click', () => {
      localStorage.setItem('role', 'tutor');
      window.location.href = '/html/itutor.html';
    });
  }
});

/* card courses */
function displayCourses() {
  const container = document.getElementById('courses-container');
  if (!container) return;

  const courses = JSON.parse(localStorage.getItem('courses')) || [];

  const iconsMap = {
    "Art & Design": "🎨",
    "Development": "💻",
    "Communication": "🗣️",
    "Videography": "🎥",
    "Photography": "📸",
    "Marketing": "📈",
    "Content Writing": "✍️",
    "Finance": "💰",
    "Science": "🔬",
    "Network": "🌐",
  };

  courses.forEach(course => {
    const icon = iconsMap[course.category] || "📚";
    const card = createCourseCard({
      icon,
      title: course.category,
      tutorCount: course.count,
    });
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayCourses();
});



function displayCommunity() {
  const container = document.getElementById('community-container');
  if (!container) return;

  const communityGroups = JSON.parse(localStorage.getItem('community')) || [];

  communityGroups.forEach(group => {
    const card = createCommunityCard({
      image: group.image,
      title: group.title,
      subject: group.subject,
      description: group.description,
    });
    container.appendChild(card);
  });
}

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


