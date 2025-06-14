let community = JSON.parse(localStorage.getItem("community")) || [];

// Classe modelo (opcional)
class CommunityGroup {
  constructor(title, subject, description, image) {
    this.id = Date.now();
    this.title = title;
    this.subject = subject;
    this.description = description;
    this.image = image;
  }
}

// Adicionar grupo
export function add(title, subject, description, image) {
  const group = new CommunityGroup(title, subject, description, image);
  community.push(group);
  localStorage.setItem("community", JSON.stringify(community));
}

// Obter todos os grupos
export function getAll() {
  return community;
}

// Obter por ID
export function getById(id) {
  return community.find((group) => group.id === id);
}

// Atualizar grupo
export function update(id, updatedData) {
  const index = community.findIndex((group) => group.id === id);
  if (index !== -1) {
    community[index] = { ...community[index], ...updatedData };
    localStorage.setItem("community", JSON.stringify(community));
  }
}

// Remover grupo
export function remove(id) {
  community = community.filter((group) => group.id !== id);
  localStorage.setItem("community", JSON.stringify(community));
}
