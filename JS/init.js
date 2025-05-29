
// route botoes

const courseBtn = document.getElementById('btn-course');
if (courseBtn) {
  courseBtn.addEventListener('click', () => {
    window.location.href = './html/courses.html';
  });
}
