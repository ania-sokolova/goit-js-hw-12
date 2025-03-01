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
const perPage = 40; 
let totalHits = 0; 

document.addEventListener("DOMContentLoaded", () => {
  loadMoreButton.classList.add("hidden");
  endMessage.classList.add("hidden");
});

async function loadImages(query, page) {
  try {
    loader.classList.remove("hidden-loader"); 

    const data = await fetchImages(query, page);
    totalHits = data.totalHits;

    if (page === 1) {
      renderImages(data.hits, true); 
    } else {
      renderImages(data.hits, false);
    }

    if (data.hits.length === 0) {
      iziToast.error({
        title: "Error",
        message: "No images found. Try another search!",
        position: "topRight",
      });
      loadMoreButton.classList.add("hidden");
      endMessage.classList.add("hidden");
      return;
    }

   
    if (page * perPage < totalHits) {
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

    if (page > 1) {
      smoothScroll(); 
    }
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
