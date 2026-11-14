/* ============================================
   VISHAL KUMAR — PORTFOLIO SCRIPTS
   ============================================ */

// --- Theme Toggle ---
const themeBtn = document.getElementById('themeBtn');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    themeBtn.textContent = document.body.classList.contains('light') ? '◑' : '◐';
  });
}

// --- Staggered slide reveals ---
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const slideCards = document.querySelectorAll('.toc-card, .project-card, .showcase-item');
if (!reducedMotion) {
  slideCards.forEach((card, index) => {
    card.classList.add('slide-in');
    card.style.setProperty('--slide-delay', `${(index % 3) * 105}ms`);
  });
  document.querySelectorAll('.finike-store-shot, .finike-hardware-shot').forEach((shot, index) => {
    shot.style.setProperty('--slide-delay', `${(index % 3) * 105}ms`);
  });
  document.body.classList.add('motion-ready');
}

const fadeObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { rootMargin: '0px 0px -35px 0px', threshold: 0.08 });
document.querySelectorAll('.fade-up, .slide-in').forEach(el => fadeObserver.observe(el));

// --- Slide between portfolio pages ---
if (!reducedMotion) {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;

    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin || !destination.pathname.endsWith('.html') || (destination.pathname === window.location.pathname && destination.search === window.location.search)) return;

    event.preventDefault();
    document.body.classList.add('page-sliding-out');
    window.setTimeout(() => { window.location.href = destination.href; }, 440);
  });
  window.addEventListener('pageshow', () => document.body.classList.remove('page-sliding-out'));
}

// --- Active Nav Link Spy (index.html only) ---
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section, footer[id]');
if (navLinks.length && sections.length) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(sec => spy.observe(sec));
}

// --- Sub-page nav highlight ---
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  }
});

// --- Logo item click-to-expand ---
document.querySelectorAll('.logo-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = item.classList.contains('expanded');
    document.querySelectorAll('.logo-item.expanded').forEach(el => el.classList.remove('expanded'));
    if (!isExpanded) item.classList.add('expanded');
  });
});
document.querySelector('.logo-grid')?.addEventListener('click', () => {
  document.querySelectorAll('.logo-item.expanded').forEach(el => el.classList.remove('expanded'));
});

// --- Mini Vishal mascot ---
const mascotButton = document.getElementById('mascotButton');
const mascotPlayButton = document.getElementById('mascotPlayButton');
const mascotPlayground = document.getElementById('mascotPlayground');
const mascotMessage = document.getElementById('mascotMessage');
if (mascotButton && mascotPlayButton && mascotPlayground && mascotMessage) {
  const moves = [
    { name: 'ninja-flip', message: 'Ninja flip! Catch me if you can.' },
    { name: 'ninja-dash', message: 'Shadow dash! Too fast to spot.' },
    { name: 'ninja-slash', message: 'Lightning strike! Ninja mode complete.' }
  ];
  let moveIndex = 0;
  let resetTimer;
  const playMascotMove = () => {
    const move = moves[moveIndex % moves.length];
    moveIndex += 1;
    clearTimeout(resetTimer);
    mascotPlayground.removeAttribute('data-move');
    void mascotPlayground.offsetWidth;
    mascotPlayground.dataset.move = move.name;
    mascotMessage.textContent = move.message;
    resetTimer = setTimeout(() => mascotPlayground.removeAttribute('data-move'), 1350);
  };
  mascotButton.addEventListener('click', playMascotMove);
  mascotPlayButton.addEventListener('click', playMascotMove);
}
