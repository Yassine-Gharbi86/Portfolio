
const PROJECTS = [
  { title: 'SteriFlow',      subtitle: 'Healthcare Workflow Platform' },
  { title: 'HomeSweetHome',  subtitle: 'Premium Real Estate Template' },
  { title: 'HorizonOS',      subtitle: 'Browser Operating System' },
  { title: 'Synaptic',       subtitle: 'Research Platform' },
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

/*Project card hover accent*/
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

/* Generic slider factory */
function initSlider(wrapperId, interval) {
  const wrap = document.getElementById(wrapperId);
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
    timer = setInterval(() => goTo(current + 1), interval);
  }

  function stopAuto() {
    clearInterval(timer);
  }

  
  wrap.addEventListener('mouseenter', () => {
    stopAuto();
    prev.style.opacity = '1';
    next.style.opacity = '1';
  });
  wrap.addEventListener('mouseleave', () => {
    startAuto();
    prev.style.opacity = '0';
    next.style.opacity = '0';
  });

  prev.addEventListener('click', (e) => {
    e.stopPropagation();
    stopAuto();
    goTo(current - 1);
    startAuto();
  });
  next.addEventListener('click', (e) => {
    e.stopPropagation();
    stopAuto();
    goTo(current + 1);
    startAuto();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      stopAuto();
      goTo(i);
      startAuto();
    });
  });

  startAuto();
}
/*Boot */
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
  initSlider('sf-slider',  7000);
  initSlider('hsh-slider', 7000);
  initSlider('jz-slider',  7000);
  initSlider('rai-slider', 7000);
}