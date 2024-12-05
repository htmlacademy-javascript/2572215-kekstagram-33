import { showFullPictureHandler } from './render_full_picture.js';
import { getPhotos } from '../server.js';


const pictures = document.querySelector('.pictures');
getPhotos().then((photosData) => {
  pictures.addEventListener('click', showFullPictureHandler(photosData));
});
