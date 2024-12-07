import { renderPicturesWithHandlers } from './render_full_picture.js';
import { getPhotos } from '../server.js';
import { showFilters } from '../filter.js';


getPhotos().then((photosData) => {
  showFilters(photosData);

  renderPicturesWithHandlers(photosData);
});
