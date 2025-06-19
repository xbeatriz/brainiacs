let users = JSON.parse(localStorage.getItem("users")) || [];

// INICIALIZAR USERS
export function init() {
  users = JSON.parse(localStorage.getItem("users")) || [];
}

// ADICIONAR UTILIZADOR (CREATE)
export function add(name = "", username, password, role = "user", community = [], sessions = [], progress = []) {
  if (users.some((user) => user.username === username)) {
    throw Error(`O utilizador com o username "${username}" já existe!`);
  } else {
    users.push(new User(name, username, password, role, community, sessions, progress));
    save();
  }
}

// OBTER TODOS OS USERS (READ)
export function getAll() {
  return [...users]; 
}

// OBTER UTILIZADOR POR USERNAME (READ)
export function getByUsername(username) {
  return users.find((user) => user.username === username);
}

// ATUALIZAR UTILIZADOR (UPDATE)
export function update(username, updatedFields) {
  const index = users.findIndex((user) => user.username === username);
  if (index === -1) throw Error(`Utilizador "${username}" não encontrado!`);

  users[index] = { ...users[index], ...updatedFields };
  save();
}

// REMOVER UTILIZADOR (DELETE)
export function remove(username) {
  const index = users.findIndex((user) => user.username === username);
  if (index === -1) throw Error(`Utilizador "${username}" não encontrado!`);

  users.splice(index, 1);
  save();
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
    throw Error("Login inválido!");
  }
}

// LOGOUT
export function logout() {
  sessionStorage.removeItem("loggedUser");
}

// VERIFICA SE ALGUÉM ESTÁ AUTENTICADO
export function isLogged() {
  return !!sessionStorage.getItem("loggedUser");
}

// DEVOLVE O UTILIZADOR AUTENTICADO
export function getUserLogged() {
  return JSON.parse(sessionStorage.getItem("loggedUser"));
}

// FUNÇÃO PRIVADA PARA GUARDAR NO LOCALSTORAGE
function save() {
  localStorage.setItem("users", JSON.stringify(users));
}

/**
 * CLASSE MODELO DE UTILIZADOR
 */
class User {
  username = "";
  password = "";
  role = "user";
  name = "";
  community = [];
  sessions = [];
  progress = [];

  constructor(name, username, password, role = "user", community = [], sessions = [], progress = []) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.name = name;
    this.community = community;
    this.sessions = sessions;
    this.progress = progress;
  }
}
