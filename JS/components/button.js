export function styleButtons() {
  const buttons = document.querySelectorAll('[data-btn]');

  const colorMap = {
    orange: ['bg-orange-500', 'hover:bg-orange-600'],
    red: ['bg-red-500', 'hover:bg-red-600'],
    green: ['bg-green-500', 'hover:bg-green-600'],
    blue: ['bg-blue-500', 'hover:bg-blue-600'],
    gray: ['bg-gray-500', 'hover:bg-gray-600'],
  };

  buttons.forEach((btn) => {
    const color = btn.dataset.color || 'gray';
    const colorClasses = colorMap[color] || colorMap.gray;

    // Aplica classes de estilo
    btn.classList.add(
      'text-white',
      'text-sm',
      'px-6',
      'py-2',
      'rounded-full',
      'inline-block',
      'text-center',
      ...colorClasses
    );

   
    if (btn.tagName.toLowerCase() === 'button' && btn.dataset.href) {
      btn.addEventListener('click', () => {
        window.location.href = btn.dataset.href;
      });
    }
  });
}
