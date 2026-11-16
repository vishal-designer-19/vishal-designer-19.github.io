const digitalLightbox = document.getElementById('digitalLightbox');

if (digitalLightbox && typeof digitalLightbox.showModal === 'function') {
  const previewImage = document.getElementById('digitalLightboxImage');
  const previewTitle = document.getElementById('digitalLightboxTitle');
  const closeButton = digitalLightbox.querySelector('.digital-lightbox-close');

  document.querySelectorAll('.digital-image').forEach((link) => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const card = link.closest('.digital-card');
      const image = link.querySelector('img');
      previewImage.src = link.href;
      previewImage.alt = image?.alt || '';
      previewTitle.textContent = card?.querySelector('h3')?.textContent || 'Creative preview';
      digitalLightbox.showModal();
    });
  });

  closeButton.addEventListener('click', () => digitalLightbox.close());
  digitalLightbox.addEventListener('click', (event) => {
    if (event.target === digitalLightbox) digitalLightbox.close();
  });
  digitalLightbox.addEventListener('close', () => {
    previewImage.removeAttribute('src');
  });
}
