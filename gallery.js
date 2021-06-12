import galleryItems from './app.js';

const refs = {
    closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
    overlay: document.querySelector('.lightbox__overlay'),
    galleryContainer: document.querySelector('.js-gallery'),
  lightboxImage: document.querySelector('.lightbox__image'),
    lightbox: document.querySelector('.js-lightbox'),
}

const galleryMarkup = createGalleryMarkup(galleryItems);
refs.galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(galleryItems) {
  return galleryItems.map(({ preview, original, description }, index) => {
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
      data-index = ${index}
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
    window.addEventListener('keydown', onKeyPress);
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return
  }
  
    refs.lightbox.classList.toggle('is-open');
    refs.lightboxImage.src = evt.target.dataset.source;
  refs.lightboxImage.alt = evt.target.alt;
  refs.lightboxImage.setAttribute('data-index', evt.target.dataset.index)
}

function onOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    
    onCloseModal();
  }
}

function onCloseModal() {
    window.removeEventListener('keydown', onKeyPress);
    refs.overlay.removeEventListener('click', onOverlayClick);
    refs.closeModalBtn.removeEventListener('click', onCloseModal);
    refs.lightbox.classList.toggle('is-open');
    refs.lightboxImage.src = '';
  refs.lightboxImage.alt = '';
  refs.lightboxImage.removeAttribute('data-index');
}

function onKeyPress(evt) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = evt.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }

  const arrowRight = evt.code === 'ArrowRight';
  const arrowLeft = evt.code === 'ArrowLeft';

   if (arrowRight || arrowLeft) {
    showSlides();
  }
}

function showSlides(arrow) {
  let slideIndex;

  if (arrow) { slideIndex = Number(refs.lightboxImage.dataset.index) + 1; }
  else { slideIndex = Number(refs.lightboxImage.dataset.index) - 1; }



  if (slideIndex < 0) {
    slideIndex = galleryItems.length + slideIndex;
  }

  if (slideIndex === galleryItems.length) {
    slideIndex = 0;
  }

  refs.lightboxImage.src = galleryItems[slideIndex].original;
  refs.lightboxImage.dataset.index = slideIndex;
}


