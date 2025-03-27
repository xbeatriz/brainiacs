document.getElementById('search').addEventListener('input', function() {
    let searchValue = this.value.toLowerCase();
    let tutors = document.querySelectorAll('#tutor-list div');
    
    tutors.forEach(tutor => {
        let subject = tutor.querySelector('p').textContent.toLowerCase();
        tutor.style.display = subject.includes(searchValue) ? 'block' : 'none';
    });
});

document.querySelectorAll('.contact-btn').forEach(button => {
    button.addEventListener('click', function() {
        alert('Entraremos em contacto com o tutor!');
    });
});