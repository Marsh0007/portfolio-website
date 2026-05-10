document.addEventListener("DOMContentLoaded", () => {
  loadComponent("navbar", "/components/navbar.html", true);
  loadComponent("footer", "/components/footer.html", false);
});

function loadComponent(id, file, isNavbar = false) {
  fetch(file)
    .then((res) => res.text())
    .then((data) => {
      const element = document.getElementById(id);
      if (!element) return;

      element.innerHTML = data;

      if (isNavbar) {
        setupMobileMenu();
        setActiveLink();
      }
    })
    .catch((error) => console.error(`Error loading ${file}:`, error));
}

function setupMobileMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active");
      navLinks.classList.remove("active");
    });
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

  const links = document.querySelectorAll(".nav-links a, .nav-cta");

  links.forEach((link) => {
    if (link.dataset.page === current) {
      link.classList.add("active-link");
    }
  });
}