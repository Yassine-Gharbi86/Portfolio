
function initLightbox() {
  const overlay = document.createElement('div');
  overlay.className = 'lb-overlay';
  overlay.innerHTML = `
    <button class="lb-close" aria-label="Close">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
    <div class="lb-img-wrap">
      <img class="lb-img" src="" alt="Preview">
    </div>
    <button class="lb-arrow lb-arrow-prev" aria-label="Previous">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <button class="lb-arrow lb-arrow-next" aria-label="Next">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
    <div class="lb-dots"></div>
    <span class="lb-counter"></span>
  `;
  document.body.appendChild(overlay);

  const img      = overlay.querySelector('.lb-img');
  const dotsWrap = overlay.querySelector('.lb-dots');
  const counter  = overlay.querySelector('.lb-counter');

  let images       = [];
  let current      = 0;
  let activeSlider = null;

  function buildDots() {
    dotsWrap.innerHTML = '';
    images.forEach((_, i) => {
      const d = document.createElement('span');
      d.className = 'lb-dot' + (i === current ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    });
  }

  function updateUI() {
    img.src = images[current];
    counter.textContent = `${current + 1} / ${images.length}`;
    dotsWrap.querySelectorAll('.lb-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
    if (activeSlider) {
      activeSlider.querySelectorAll('.sf-slide').forEach((s, i) =>
        s.classList.toggle('active', i === current)
      );
      activeSlider.querySelectorAll('.sf-dot').forEach((d, i) =>
        d.classList.toggle('active', i === current)
      );
    }
  }

  function goTo(index) {
    img.style.opacity   = '0';
    img.style.transform = 'scale(0.96)';
    setTimeout(() => {
      current = (index + images.length) % images.length;
      updateUI();
      img.style.opacity   = '1';
      img.style.transform = 'scale(1)';
    }, 180);
  }

  function open(sliderEl, srcs, startIndex) {
    activeSlider = sliderEl;
    images       = srcs;
    current      = startIndex;
    buildDots();
    updateUI();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    activeSlider = null;
  }

  overlay.querySelector('.lb-close').addEventListener('click', close);
  overlay.querySelector('.lb-arrow-prev').addEventListener('click', () => goTo(current - 1));
  overlay.querySelector('.lb-arrow-next').addEventListener('click', () => goTo(current + 1));
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'Escape')     close();
  });

  let touchStartX = 0;
  overlay.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  overlay.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });


  function bindAllSliders() {
    document.querySelectorAll('.sf-slider-wrap, .hsh-slider-wrap, .jz-slider-wrap').forEach(sliderEl => {
      const slides = sliderEl.querySelectorAll('.sf-slide');
      const srcs   = Array.from(slides).map(s => s.src);
      slides.forEach((slide, i) => {
        slide.addEventListener('click', () => open(sliderEl, srcs, i));
      });
    });
  }

  setTimeout(bindAllSliders, 400);
}