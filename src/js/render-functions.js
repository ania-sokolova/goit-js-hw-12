import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function renderImages(images, isNewSearch) {
  const gallery = document.querySelector(".gallery");

  if (isNewSearch) {
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

  new SimpleLightbox(".gallery a", { captionsData: "alt", captionDelay: 250 });
}