import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function renderImages(images, isNewSearch) {
  const gallery = document.querySelector(".gallery");

  if (isNewSearch) {
    gallery.innerHTML = "";
  }

  const galleryMarkup = images
    .map(
      ({ previewURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image"
                 src="${previewURL}"
                 data-source="${largeImageURL}"
                 alt="${tags}" />
          </a>
          <div class="image-info">
            <table>
              <thead>
                <tr>
                  <th>Likes</th>
                  <th>Views</th>
                  <th>Comments</th>
                  <th>Downloads</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${likes}</td>
                  <td>${views}</td>
                  <td>${comments}</td>
                  <td>${downloads}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>`
    )
    .join("");

  gallery.insertAdjacentHTML("beforeend", galleryMarkup);

  new SimpleLightbox(".gallery a", { captionsData: "alt", captionDelay: 250 });
}
