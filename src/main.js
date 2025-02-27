import { fetchImages } from "./js/pixabay-api.js";
import { renderImages } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".search-form");
const searchInput = form.querySelector("input[name='text']");
const loadMoreButton = document.querySelector(".load-more");
const endMessage = document.querySelector(".end-notification");
const loader = document.getElementById("loader");

let currentPage = 1;
let currentQuery = "";
let totalHits = 0;


async function loadImages(query, page) {
  try {
    loader.classList.remove("hidden-loader"); 

    const data = await fetchImages(query, page);
    totalHits = data.totalHits;

    renderImages(data.hits, page === 1); 

    if (data.hits.length === 0) {
      iziToast.error({
        title: "Error",
        message: "No images found. Try another search!",
        position: "topRight",
      });
      loadMoreButton.classList.add("hidden");
      return;
    }

    if (page * 40 < totalHits) {
      loadMoreButton.classList.remove("hidden");
      endMessage.classList.add("hidden");
    } else {
      loadMoreButton.classList.add("hidden");
      endMessage.classList.remove("hidden");
      iziToast.info({
        title: "Info",
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    }

    smoothScroll(); 
  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "Failed to fetch images. Please try again!",
      position: "topRight",
    });
  } finally {
    loader.classList.add("hidden-loader"); 
  }
}


function smoothScroll() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  if (galleryItems.length > 0) {
    const { height } = galleryItems[0].getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: "smooth",
    });
  }
}


form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const query = searchInput.value.trim();

  if (query === "") {
    iziToast.warning({
      title: "Warning",
      message: "Please enter a search query!",
      position: "topRight",
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  totalHits = 0;
  loadMoreButton.classList.add("hidden");
  endMessage.classList.add("hidden");

  loadImages(currentQuery, currentPage);
});

loadMoreButton.addEventListener("click", () => {
  currentPage += 1;
  loadImages(currentQuery, currentPage);
});

