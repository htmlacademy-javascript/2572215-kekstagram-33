/* eslint-disable quotes*/
import { clearPictures } from "./gallery/render.js";
import { renderPicturesWithHandlers } from "./gallery/render_full_picture.js";

const filters = document.querySelector(".img-filters");
const filterButtons = filters.querySelectorAll(".img-filters__button");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("img-filters__button--active"));
    button.classList.add("img-filters__button--active");
  });
});

const showFilters = (photosData) => {
  filters.classList.remove("img-filters--inactive");

  onClickDefaultFilter(photosData);
  onClickRandomFilter(photosData);
  onClickDiscussedFilter(photosData);
};

const debounce = (cb, timeout = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, timeout);
  };
};

const addFilter = (filter, cb) => {
  filter.addEventListener("click", debounce(cb));
};

function onClickDefaultFilter(photosData) {
  addFilter(document.querySelector("#filter-default"), () => {
    clearPictures();
    renderPicturesWithHandlers(photosData);
  });
}

function onClickRandomFilter(photosData) {
  addFilter(document.querySelector("#filter-random"), () => {
    clearPictures();
    const randomPhotos = photosData.slice().sort(() => Math.random() - 0.5);
    renderPicturesWithHandlers(randomPhotos);
  });
}

function onClickDiscussedFilter(photosData) {
  addFilter(document.querySelector("#filter-discussed"), () => {
    clearPictures();
    const discussedPhotos = photosData.slice().sort((a, b) => b.comments.length - a.comments.length);
    renderPicturesWithHandlers(discussedPhotos);
  });
}


export { showFilters };

