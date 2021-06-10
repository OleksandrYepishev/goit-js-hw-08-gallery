import galleryItems from './app.js';

const refs = {
    closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
    overlay: document.querySelector('.lightbox__overlay'),
    galleryContainer: document.querySelector('.js-gallery'),
    lightboxImage: document.querySelector('.lightbox__image'),
}

const galleryMarkup = createGalleryMarkup(galleryItems);
refs.galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
    return `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
`;
  }).join('');
}

refs.galleryContainer.addEventListener('click', onGalleryItemClick);
 
function onGalleryItemClick(evt) {
    refs.overlay.addEventListener('click', onOverlayClick);
    refs.closeModalBtn.addEventListener('click', onCloseModal);
    window.addEventListener('keydown', onEscKeyPress);
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return
  }
  const swathClass = document.querySelector('.lightbox');
    swathClass.classList.toggle('is-open');
    refs.lightboxImage.src = evt.target.dataset.source;
    refs.lightboxImage.alt = evt.target.alt;
  
}

function onOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    
    onCloseModal();
  }
}

function onCloseModal() {
    window.removeEventListener('keydown', onEscKeyPress);
    refs.overlay.removeEventListener('click', onOverlayClick);
    refs.closeModalBtn.removeEventListener('click', onCloseModal);
    const swathClass = document.querySelector('.lightbox');
    swathClass.classList.toggle('is-open');
    lightboxImage.src = '';
    lightboxImage.alt = '';
}

function onEscKeyPress(evt) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = evt.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}
