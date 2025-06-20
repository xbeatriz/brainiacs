let community = JSON.parse(localStorage.getItem("community")) || [];

// Função para salvar localStorage
function save() {
  localStorage.setItem("community", JSON.stringify(community));
}

export function getAll() {
  return community;
}

export function getById(id) {
  return community.find(c => c.id === id);
}

export function add(title, subject, description, image) {
  const newGroup = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    title,
    subject,
    description,
    image
  };
  community.push(newGroup);
  save();
}

export function update(id, updatedData) {
  const numericId = Number(id);
  community = JSON.parse(localStorage.getItem("community")) || [];

  const index = community.findIndex(c => c.id === numericId);
  if (index === -1) {
    throw new Error(`Grupo com ID ${id} não encontrado.`);
  }

  community[index] = {
    ...community[index],
    ...updatedData,
    id: community[index].id
  };

  save();
}

export function remove(id) {
  community = community.filter(c => c.id !== id);
  save();
}
