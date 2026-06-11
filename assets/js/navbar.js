
function initNavbar() {
  const navbar     = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        mobileMenu.addEventListener('transitionend', () => {
          if (!mobileMenu.classList.contains('open')) {
            mobileMenu.style.display = 'none';
          }
        }, { once: true });
      } else {
        mobileMenu.style.display = 'block';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            mobileMenu.classList.add('open');
          });
        });
      }
    });
  }
}

function closeMobile() {
  const m = document.getElementById('mobile-menu');
  if (!m) return;
  m.classList.remove('open');
  m.addEventListener('transitionend', () => {
    if (!m.classList.contains('open')) m.style.display = 'none';
  }, { once: true });
}