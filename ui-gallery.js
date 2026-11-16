const uiLightbox = document.getElementById('uiLightbox');

if (uiLightbox && typeof uiLightbox.showModal === 'function') {
  const previewImage = document.getElementById('uiLightboxImage');
  const previewTitle = document.getElementById('uiLightboxTitle');
  const closeButton = uiLightbox.querySelector('.ui-lightbox-close');

  document.querySelectorAll('.ui-image').forEach((link) => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const card = link.closest('.ui-card');
      const image = link.querySelector('img');
      previewImage.src = link.href;
      previewImage.alt = image?.alt || '';
      previewTitle.textContent = card?.querySelector('h3')?.textContent || 'UI concept';
      uiLightbox.showModal();
    });
  });

  closeButton.addEventListener('click', () => uiLightbox.close());
  uiLightbox.addEventListener('click', (event) => {
    if (event.target === uiLightbox) uiLightbox.close();
  });
  uiLightbox.addEventListener('close', () => previewImage.removeAttribute('src'));
}
