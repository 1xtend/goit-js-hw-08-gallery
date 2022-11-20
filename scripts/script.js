import images from './images.js';

/*

<li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li>

*/

// Functions

const gallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const modalImage = modal.querySelector('.lightbox__image');
const closeBtn = modal.querySelector('button[data-action="close-lightbox"]');
const modalOverlay = modal.querySelector('.lightbox__overlay');

let isModalOpen = false;
let activeIndex = -1;

// * Create and Add elems

function createGalleryElem(preview, original, description) {
  const finalHtml = `
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

  return finalHtml;
}

function renderImages() {
  let finalImages = '';
  images.forEach((image) => {
    const imageHtml = createGalleryElem(image.preview, image.original, image.description);

    finalImages += imageHtml;
  });

  gallery.insertAdjacentHTML('beforeend', finalImages);
}

renderImages();

// * Open Modal

function openModal(originalUrl, description) {
  modal.classList.add('is-open');
  modalImage.src = originalUrl;
  modalImage.alt = description;

  isModalOpen = true;
}

gallery.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.classList.contains('gallery__image')) {
    const originalUrl = e.target.dataset.source;
    const description = e.target.alt;
    openModal(originalUrl, description);
  }
});

// * Close Modal

function closeModal() {
  modal.classList.remove('is-open');
  modalImage.src = '';
  modalImage.alt = '';

  isModalOpen = false;
}

closeBtn.addEventListener('click', (e) => {
  closeModal();
});

modalOverlay.addEventListener('click', () => {
  closeModal();
});

// * Slider

function prev() {
  console.log('prev');
}

function next() {
  console.log('next');
}

window.addEventListener('keydown', (e) => {
  if (!isModalOpen) {
    return;
  }

  switch (e.code) {
    case 'Escape':
      closeModal();

      break;

    case 'ArrowLeft':
      prev();

      break;

    case 'ArrowRight':
      next();

      break;

    default:
      break;
  }
});
