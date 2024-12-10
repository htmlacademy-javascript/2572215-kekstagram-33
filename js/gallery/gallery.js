import { getPhotos } from '../server.js';
import { showFilters } from '../filter.js';
import { renderPictures } from './render.js';

getPhotos().then((photosData) => {
  showFilters(photosData);
  renderPictures(photosData);
});
