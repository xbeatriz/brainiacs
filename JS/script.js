
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