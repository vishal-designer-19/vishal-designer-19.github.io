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

// --- Scroll Fade-In Animation ---
const fadeObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

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
