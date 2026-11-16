const packagingLightbox = document.getElementById('uploadedLightbox');

if (packagingLightbox && typeof packagingLightbox.showModal === 'function') {
  const previewImage = document.getElementById('uploadedLightboxImage');
  const previewTitle = document.getElementById('uploadedLightboxTitle');

  document.querySelectorAll('.uploaded-frame').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const card = link.closest('.uploaded-card');
      const sourceImage = link.querySelector('img');
      previewImage.src = link.href;
      previewImage.alt = sourceImage?.alt || '';
      previewTitle.textContent = card?.querySelector('h3')?.textContent || 'Packaging sheet';
      packagingLightbox.showModal();
    });
  });

  packagingLightbox.querySelector('.uploaded-lightbox-close').addEventListener('click', () => packagingLightbox.close());
  packagingLightbox.addEventListener('click', (event) => {
    if (event.target === packagingLightbox) packagingLightbox.close();
  });
}
