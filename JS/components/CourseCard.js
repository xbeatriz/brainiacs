export function createCourseCard({icon, title, tutorCount}) {
    const card = document.createElement('div');
    card.className = "bg-white p-6 rounded-xl shadow-md flex flex-col";

    const header = document.createElement('div');
    header.className = "flex items-center gap-3 mb-3";

    const iconEl = document.createElement('span');
    iconEl.textContent = icon;
    iconEl.className = "text-3xl";

    const titleEl = document.createElement('h3');
    titleEl.textContent = title;
    titleEl.className = "font-semibold text-lg";

    header.appendChild(iconEl);
    header.appendChild(titleEl);

    const countEl = document.createElement('p');
    countEl.textContent = `${tutorCount} itens`;
    countEl.className = "text-gray-500 text-sm";

    card.appendChild(header);
    card.appendChild(countEl);

    return card;
}
