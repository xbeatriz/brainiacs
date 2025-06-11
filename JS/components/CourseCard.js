// /components/courseCard.js
export function createCourseCard({ icon, title, tutorCount }) {
  const card = document.createElement('div');
  card.className = 'bg-white rounded-xl p-6 shadow hover:shadow-md hover:bg-orange-500 transition text-center text-sm';

  card.innerHTML = `
    <div class="text-3xl text-orange-500 mb-2">${icon}</div>
    <h3 class="font-semibold mb-1">${title}</h3>
    <p class="text-gray-900 text-xs">${tutorCount} Tutors</p>
  `;

  return card;
}
