/* ─────────────────────────────────────────────────────────
   projects.js  —  project card interactions · modal
   ───────────────────────────────────────────────────────── */

const PROJECTS = [
  { title: 'NeuralDash',  subtitle: 'AI Analytics Platform' },
  { title: 'HorizonOS',   subtitle: 'Browser Operating System' },
  { title: 'Synaptic',    subtitle: 'Research Platform' },
];

let _modal = null;

function openModal(proj) {
  if (!_modal) _modal = document.getElementById('modal');
  if (!_modal) return;
  const titleEl    = document.getElementById('modal-title');
  const subtitleEl = document.getElementById('modal-subtitle');
  if (titleEl)    titleEl.textContent    = proj.title;
  if (subtitleEl) subtitleEl.textContent = proj.subtitle;
  _modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!_modal) _modal = document.getElementById('modal');
  if (!_modal) return;
  _modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* ─── Project card hover accent ─────────────────────────── */
function initCardAccents() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const num = card.querySelector('.project-number');
      if (num) num.style.color = 'rgba(74,92,58,0.12)';
    });
    card.addEventListener('mouseleave', () => {
      const num = card.querySelector('.project-number');
      if (num) num.style.color = '';
    });
  });
}

/* ─── Boot ──────────────────────────────────────────────── */
function initProjects() {
  _modal = document.getElementById('modal');

  if (_modal) {
    _modal.addEventListener('click', e => {
      if (e.target === _modal) closeModal();
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  initCardAccents();
}

/* ─── SteriFlow Image Slider ─────────────────────────────── */
function initSFSlider() {
  const wrap   = document.getElementById('sf-slider');
  if (!wrap) return;

  const slides = wrap.querySelectorAll('.sf-slide');
  const dots   = wrap.querySelectorAll('.sf-dot');
  const prev   = wrap.querySelector('.sf-prev');
  const next   = wrap.querySelector('.sf-next');
  let current  = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    timer = setInterval(() => goTo(current + 1), 3500);
  }

  function stopAuto() {
    clearInterval(timer);
  }

  // Arrow clicks
  prev.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  next.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

  // Dot clicks
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
  });

  // Pause on hover
  wrap.addEventListener('mouseenter', stopAuto);
  wrap.addEventListener('mouseleave', startAuto);

  startAuto();
}