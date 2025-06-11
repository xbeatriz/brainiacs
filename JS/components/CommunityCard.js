export function createCommunityCard({ image, title, subject, description }) {
  const card = document.createElement('div');
  card.className = 'bg-white rounded-xl shadow overflow-hidden flex flex-col';

  card.innerHTML = `
    <img src="${image}" alt="${title}" class="h-40 w-full object-cover">
    <div class="p-4 flex-1 flex flex-col justify-between">
      <div>
        <span class="text-xs bg-black text-white px-2 py-0.5 rounded-full inline-block mb-2">${subject}</span>
        <h3 class="text-base font-bold mb-1">${title}</h3>
        <p class="text-sm text-gray-600">${description}</p>
      </div>
      <a href="#" class="mt-4 inline-block text-center bg-black text-white rounded-full py-2 px-4 text-sm hover:bg-gray-800">View group</a>
    </div>
  `;

  return card;
}
