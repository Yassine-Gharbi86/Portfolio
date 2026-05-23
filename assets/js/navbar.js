/* ─────────────────────────────────────────────────────────
   navbar.js  —  scroll effect · mobile menu
   ───────────────────────────────────────────────────────── */

function initNavbar() {
  const navbar     = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }
}

function closeMobile() {
  document.getElementById('mobile-menu')?.classList.remove('open');
}