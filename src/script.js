document.addEventListener("DOMContentLoaded", () => {
    const fadeInSections = document.querySelectorAll("section, .fade-in");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    fadeInSections.forEach((section) => {
      section.classList.add("fade-in");
      observer.observe(section);
    });
  });