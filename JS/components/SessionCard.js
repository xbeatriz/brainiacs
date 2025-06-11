export function createSessionCard({ date, time, topic, tutor, isPast }) {
  const card = document.createElement('div');
  card.className = 'bg-white rounded-xl shadow p-4 border border-gray-100';

  card.innerHTML = `
    <h3 class="font-semibold text-lg text-gray-900 mb-1">${topic}</h3>
    <p class="text-gray-600 text-sm">Com ${tutor}</p>
    <p class="text-gray-500 text-xs mt-2">📅 ${date} às ${time}</p>
    ${
      isPast
        ? `<button class="mt-4 w-full text-center text-sm text-orange-500 border border-orange-400 hover:bg-orange-50 rounded-full px-4 py-2">Ver detalhes</button>`
        : `<button class="mt-4 w-full text-center text-sm text-white bg-black hover:bg-orange-600 rounded-full px-4 py-2">Entrar na sessão</button>`
    }
  `;

  return card;
}
