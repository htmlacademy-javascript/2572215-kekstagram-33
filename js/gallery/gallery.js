import { genPhotos } from '../image/image.js';
import { renderPictures } from './render.js';
import { showFullPictureHandler } from './render_full_picture.js';

const photosData = genPhotos();
const pictures = document.querySelector('.pictures');

renderPictures(photosData);
pictures.addEventListener('click', showFullPictureHandler(photosData));
