import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox;

export function renderImages(images, clearGallery = false) {
  const gallery = document.querySelector(".gallery");

  if (clearGallery) {
    gallery.innerHTML = ""; 
  }

  const galleryMarkup = images
    .map(
      ({ previewURL, largeImageURL, tags }) =>
        `<li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image"
                 src="${previewURL}"
                 data-source="${largeImageURL}"
                 alt="${tags}" />
          </a>
        </li>`
    )
    .join("");

  gallery.insertAdjacentHTML("beforeend", galleryMarkup);

  if (!lightbox) {
    lightbox = new SimpleLightbox(".gallery a", { captionsData: "alt", captionDelay: 250 });
  } else {
    lightbox.refresh();
  }
}