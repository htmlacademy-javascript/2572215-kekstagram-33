/* eslint-disable quotes*/
import { RANDOM_COUNT_PHOTOS } from "./constants.js";
import { clearPictures, renderPictures } from "./gallery/render.js";

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
    renderPictures(photosData);
  });
}

function onClickRandomFilter(photosData) {
  addFilter(document.querySelector("#filter-random"), () => {
    clearPictures();
    const randomPhotos = photosData.slice(0, RANDOM_COUNT_PHOTOS).sort(() => Math.random() - 0.5);
    renderPictures(randomPhotos);
  });
}

function onClickDiscussedFilter(photosData) {
  addFilter(document.querySelector("#filter-discussed"), () => {
    clearPictures();
    const discussedPhotos = photosData.slice().sort((a, b) => b.comments.length - a.comments.length);
    renderPictures(discussedPhotos);
  });
}

export { showFilters };

