let users = JSON.parse(localStorage.getItem("users")) || [];

// CARREGAR UTILIZADORES DA LOCALSTORAGE
export function init() {
   users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
}

// ADICIONAR UTILIZADOR
export function add(name = "", username, password, role = "user", community = [], sessions = [], progress = []) {
  if (users.some((user) => user.username === username)) {
    throw Error(`User with username "${username}" already exists!`);
  } else {
    users.push(new User(name, username, password, role, community, sessions, progress));
    localStorage.setItem("users", JSON.stringify(users));
  }
}

// LOGIN DO UTILIZADOR
export function login(username, password) {
  const user = users.find(
    (user) => user.username === username && user.password === password );
  if (user) {
    sessionStorage.setItem("loggedUser", JSON.stringify(user));
    return true;
  } else {
    throw Error("Invalid login!");
  }
}

// LOGOUT DO UTILIZADOR
export function logout() {
  sessionStorage.removeItem("loggedUser");
}

// VERIFICA EXISTÊNCIA DE ALGUÉM AUTENTICADO
export function isLogged() {
  return sessionStorage.getItem("loggedUser") ? true : false;
}

// DEVOLVE UTILZIADOR AUTENTICADO
export function getUserLogged() {
  return JSON.parse(sessionStorage.getItem("loggedUser"));
}

/**
 * CLASSE QUE MODELA UM UTILIZADOR NA APLICAÇÃO
 */
class User {
  username = "";
  password = "";
  role = "user";
  name = "";
  community = [];
  sessions = [];
  progress = [];

  constructor(name, username, password, role = "user" , community = [], sessions = [], progress = []) {
    
    this.username = username;
    this.password = password;
    this.role = role;
    this.name = name;
    this.community = community;
    this.sessions = sessions;    
    this.progress = progress;
  }
}