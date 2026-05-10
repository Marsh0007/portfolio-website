document.addEventListener("DOMContentLoaded", () => {
  loadComponent("navbar", "/components/navbar.html");
  loadComponent("footer", "/components/footer.html");
});

function loadComponent(id, file) {
  fetch(file)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
      setupMobileMenu();
      setActiveLink();
    })
    .catch((error) => console.error(`Error loading ${file}:`, error));

    
}

function setupMobileMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.querySelector(".nav-links");

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

function setActiveLink() {
  const path = window.location.pathname;

  let current = "home";

  if (path.includes("demos")) current = "demos";
  else if (path.includes("services")) current = "services";
  else if (path.includes("pricing")) current = "pricing";
  else if (path.includes("about")) current = "about";
  else if (path.includes("contact")) current = "contact";

  const links = document.querySelectorAll(".nav-links a");

  links.forEach(link => {
    if (link.dataset.page === current) {
      link.classList.add("active-link");
    }
  });
}