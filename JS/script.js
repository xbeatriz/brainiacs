import { createCourseCard } from '/JS/components/CourseCard.js';


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


// route botoes

const courseBtn = document.getElementById('btn-course');
if (courseBtn) {
  courseBtn.addEventListener('click', () => {
    window.location.href = 'courses.html';
  });
}

const hiwBtn = document.getElementById('btn-hiw');
if (hiwBtn) {
  hiwBtn.addEventListener('click', () => {
    window.location.href = '404.html';
  });
}

const communityBtn = document.getElementById('btn-community');
if (communityBtn) {
  communityBtn.addEventListener('click', () => {
    window.location.href = 'comunity.html';
  });
}

/* btn */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-orange-500', 'text-white');
        btn.classList.add('bg-orange-100', 'text-orange-600');
      });

      button.classList.remove('bg-orange-100', 'text-orange-600');
      button.classList.add('bg-orange-500', 'text-white');
    });
  });
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

import { createCommunityCard } from '/JS/components/CommunityCard.js';

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


