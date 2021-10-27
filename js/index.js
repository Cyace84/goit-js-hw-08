import images from "./app.js";
const gallery = document.querySelector(".js-gallery");
const lightbox = document.querySelector(".js-lightbox");
const lightboxOverlay = document.querySelector(".lightbox__overlay");
const lightboxImage = document.querySelector(".lightbox__image");
const lightboxCloseBtn = document.querySelector(
  '[data-action="close-lightbox"]',
);

const galleryItems = createGalleryItems(images);
gallery.insertAdjacentHTML("beforeend", galleryItems);

gallery.addEventListener("click", e => {
  e.preventDefault();
  onModalOpen(e);
  copyGalleryAttributesToLightbox(e);
});
lightbox.addEventListener("click", onModalClose);

function createGalleryItems(galleryList) {
  return galleryList
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"/>
      </a>
    </li >
    `;
    })
    .join("");
}

function onModalOpen(event) {
  if (event.target.nodeName === "IMG") {
    lightbox.classList.add("is-open");
  }
  window.addEventListener("keydown", onModalCloseByEsc);
}

function copyGalleryAttributesToLightbox(event) {
  const imageSrc = event.target.getAttribute("data-source");
  const imageAlt = event.target.getAttribute("alt");
  lightboxImage.setAttribute("src", imageSrc);
  lightboxImage.setAttribute("alt", imageAlt);
}

function setLightboxAttributesByIndex(index) {
  const imageSrc = images[index].original;
  const imageAlt = images[index].description;
  lightboxImage.setAttribute("src", imageSrc);
  lightboxImage.setAttribute("alt", imageAlt);
}

function getCurrentImageIndexByOriginal() {
  return images.findIndex(elem => lightboxImage.src === elem.original);
}

function closeModal() {
  window.removeEventListener("keydown", onModalCloseByEsc);
  lightbox.classList.remove("is-open");
  lightboxImage.removeAttribute("src");
  lightboxImage.removeAttribute("alt");
}

function onModalCloseByEsc(event) {
  if (event.code === "Escape") {
    closeModal();
  }
}

function onModalClose(event) {
  if (event.target === lightboxOverlay || event.target === lightboxCloseBtn) {
    closeModal();
  }
}
