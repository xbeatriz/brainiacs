import { createCourseCard } from '/JS/components/CourseCard.js';
import { createCommunityCard } from '/JS/components/CommunityCard.js';
import { renderNavbar } from './views/NavbarView.js';
import { renderFooter} from './views/FoterView.js'

// Render Navbar and Footer
renderNavbar();
renderFooter();

// Funções
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


// Event Listeners


document.addEventListener("DOMContentLoaded", () => {
  displayCourses();
});

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


