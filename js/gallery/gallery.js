import { showFullPictureHandler } from './render_full_picture.js';
import { getPhotos } from '../server.js';
import { showFilters } from '../filter.js';


const pictures = document.querySelector('.pictures');
getPhotos().then((photosData) => {
  showFilters(photosData);

  pictures.addEventListener('click', showFullPictureHandler(photosData));
});
