import * as User from '../models/UserModel.js';

// Função para criar a barra de navegação
function createNavBar() {
User.init(); // Inicializa os utilizadores do localStorage

  // Cria um elemento nav
  const nav = document.createElement('nav');
  nav.className = 'bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200';

  // Cria um contêiner para a barra de navegação
  const container = document.createElement('div');
  container.className = 'max-w-screen-xl flex items-center justify-between mx-auto p-2';

  // LOGO
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.className = 'flex items-center space-x-2';
  
  const logoImg = document.createElement('img');
  logoImg.src = '/media/img/logo.svg';
  logoImg.className = 'h-5';
  logoImg.alt = 'Brainiacs Logo';
  
  logoLink.appendChild(logoImg);
  container.appendChild(logoLink);
  
  if (User.isLogged()) {
  console.log('User is logged in ' + User.getUserLogged().username);
    // Cria o link do user e o botão de logout
    const userLink = document.createElement('a');
    userLink.className = 'text-gray-900 hover:text-orange-500';
    userLink.textContent = User.getUserLogged().username;

    const logoutButton = document.createElement('button');
    logoutButton.id = 'btnLogout';
    logoutButton.className = 'text-gray-900 hover:text-orange-500';
    logoutButton.textContent = 'Logout';

    // Adiciona os elementos ao contêiner
    container.appendChild(userLink);
    container.appendChild(logoutButton);
    
    // Adiciona o evento de logout
    logoutButton.addEventListener('click', () => {
      User.logout();
      // Redireciona para a página inicial
      window.location.href = '/';

      // Mostra a modal
      const modal = document.getElementById('modalLogoutSuccess');
      modal.classList.remove('hidden');
      modal.classList.add('flex');

      // Opcional: bloquear scroll de fundo
      document.body.classList.add('overflow-hidden');
    });
  } else {
    window.location.href = '/';
  }

  // Adiciona o contêiner à barra de navegação
  nav.appendChild(container);

  // Retorna o elemento nav
  return nav;
}

// Função para renderizar a barra de navegação na div navbarDashBoard
function renderNavBar() {
  const navbarContainer = document.getElementById('navbarDashBoard');
  const navBar = createNavBar();
  navbarContainer.appendChild(navBar);
}

// Chama a função para renderizar a barra de navegação quando o módulo é carregado
renderNavBar();
