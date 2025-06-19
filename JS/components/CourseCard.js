export function createCourseCard({ name, subject, grade, availability, price, location, mode, photo, desc }) {
  const card = document.createElement('div');
  card.className = `
    max-w-sm bg-white rounded-xl shadow-lg overflow-hidden 
    hover:shadow-2xl transition-shadow duration-300
    flex flex-col md:flex-row
  `;

  card.innerHTML = `
    <div class="md:w-1/3 w-full">
      <img class="object-cover w-full h-48 md:h-full" src="${photo}" alt="${name}" />
    </div>
    <div class="md:w-2/3 w-full p-6 flex flex-col justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-900 mb-1">${name}</h2>
        <p class="text-orange-500 font-semibold mb-2">${subject}</p>
        <p class="text-gray-700 mb-1"><span class="font-semibold">Ano:</span> ${grade}</p>
        <p class="text-gray-700 mb-1"><span class="font-semibold">Disponibilidade:</span> ${availability}</p>
        <p class="text-gray-700 mb-1"><span class="font-semibold">Local:</span> ${location}</p>
        <p class="text-gray-700 mb-1"><span class="font-semibold">Modo:</span> ${mode}</p>
        <p class="text-gray-700 mb-3">${desc}</p>
      </div>
      <div>
        <span class="inline-block bg-orange-500 text-white px-4 py-2 rounded-full font-semibold">
          €${price}/hora
        </span>
      </div>
    </div>
  `;

  return card;
}
