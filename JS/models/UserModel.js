let users = [];

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  localStorage.setItem("users", JSON.stringify(users));
}

// ADICIONAR UTILIZADOR
export function add(username, password, role = "user") {
  if (users.some((user) => user.username === username)) {
    throw Error(`User with username "${username}" already exists!`);
  } else {
    users.push(new User(username, password, role));
    localStorage.setItem("users", JSON.stringify(users));
  }
}

// LOGIN DO UTILIZADOR
export function login(username, password) {
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
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

// DEVOLVE UTILIZADOR AUTENTICADO
export function getUserLogged() {
  return JSON.parse(sessionStorage.getItem("loggedUser"));
}

// OPÇÃO: inicializar se for chamado externamente
export function init() {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("users"));
  }
}

// CLASSE QUE MODELA UM UTILIZADOR
class User {
  username = "";
  password = "";
  role = "user";

  constructor(username, password, role = "user") {
    this.username = username;
    this.password = password;
    this.role = role;
  }
}
