
/*Custom Cursor*/
function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  if (!cursor || !ring) return;
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();
}

/*Scroll Progress + Back-to-Top*/
function initScrollProgress() {
  const bar     = document.getElementById('scroll-progress');
  const backTop = document.getElementById('back-top');

  window.addEventListener('scroll', () => {
    const s   = window.scrollY;
    const max = document.body.scrollHeight - window.innerHeight;
    if (backTop) backTop.classList.toggle('visible', s > 400);
    if (bar)     bar.style.width = ((s / max) * 100) + '%';
  });
}

/*Section Reveal*/
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });

  function observeAll() {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      } else {
        io.observe(el);
      }
    });
  }


  setTimeout(observeAll, 300);


  window.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 20 && rect.bottom > 0) {
        el.classList.add('visible');
        io.unobserve(el);
      }
    });
  }, { passive: true });
}


function initMain() {
  initCursor();
  initScrollProgress();
  initReveal();
  setTimeout(initCounters, 350);
  initAnimations();
}