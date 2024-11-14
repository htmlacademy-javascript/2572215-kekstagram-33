import { genPhotos } from './image/image.js';

const template = document.querySelector('#picture').content.querySelector('a');

function renderPictures() {
  const photosData = genPhotos();
  const fragment = document.createDocumentFragment();

  photosData.forEach((photo) => {
    const picture = createPicture(photo);
    fragment.append(picture);
  });

  document.querySelector('.pictures').append(fragment);
}

function createPicture(photo) {
  const picture = template.cloneNode(true);
  const img = picture.querySelector('img');

  img.src = photo.url;
  img.alt = photo.description;
  picture.querySelector('.picture__comments').textContent = photo.comments.length;
  picture.querySelector('.picture__likes').textContent = photo.likes;

  return picture;
}
