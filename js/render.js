import { genPhotos } from './image/image.js';

const fragment = document.createDocumentFragment();
const template = document.querySelector('#picture').content.querySelector('a');

genPhotos().forEach((photo) => {
  const picture = template.cloneNode(true);
  const img = picture.querySelector('img');

  img.src = photo.url;
  img.alt = photo.description;
  picture.querySelector('.picture__comments').textContent = photo.comments.length;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  fragment.append(picture);
});

document.querySelector('.pictures').append(fragment);

