document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          } else {
            entry.target.classList.remove("section-visible");
          }
        });
      },
      { threshold: 0.5 }
    );
  
    const hiddenSections = document.querySelectorAll(".section-hidden");
    hiddenSections.forEach((section) => observer.observe(section));
  });
  
  function openPopup(projectId) {
    const popup = document.getElementById(projectId);
    popup.classList.add("visible");
  }
  
  function closePopup(projectId) {
    const popup = document.getElementById(projectId);
    popup.classList.remove("visible");
  }
  