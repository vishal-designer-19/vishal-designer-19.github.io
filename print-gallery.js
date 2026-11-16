const printLightbox = document.getElementById('printLightbox');

if (printLightbox && typeof printLightbox.showModal === 'function') {
  const previewImage = document.getElementById('printLightboxImage');
  const previewTitle = document.getElementById('printLightboxTitle');
  const closeButton = printLightbox.querySelector('.print-lightbox-close');

  document.querySelectorAll('.print-image').forEach((link) => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const card = link.closest('.print-card');
      const image = link.querySelector('img');
      previewImage.src = link.href;
      previewImage.alt = image?.alt || '';
      previewTitle.textContent = card?.querySelector('h3')?.textContent || 'Print preview';
      printLightbox.showModal();
    });
  });

  closeButton.addEventListener('click', () => printLightbox.close());
  printLightbox.addEventListener('click', (event) => {
    if (event.target === printLightbox) printLightbox.close();
  });
  printLightbox.addEventListener('close', () => previewImage.removeAttribute('src'));
}
