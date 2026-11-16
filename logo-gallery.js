const gradientLightbox = document.getElementById('gradientLightbox');

if (gradientLightbox && typeof gradientLightbox.showModal === 'function') {
  const previewImage = document.getElementById('gradientLightboxImage');
  const previewTitle = document.getElementById('gradientLightboxTitle');

  document.querySelectorAll('.gradient-logo-image').forEach((link) => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const card = link.closest('.gradient-logo-card');
      const sourceImage = link.querySelector('img');
      previewImage.src = link.href;
      previewImage.alt = sourceImage?.alt || '';
      previewTitle.textContent = card?.querySelector('h2')?.textContent || 'Gradient logo';
      gradientLightbox.showModal();
    });
  });

  gradientLightbox.querySelector('.gradient-lightbox-close').addEventListener('click', () => gradientLightbox.close());
  gradientLightbox.addEventListener('click', (event) => {
    if (event.target === gradientLightbox) gradientLightbox.close();
  });
}
