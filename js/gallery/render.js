import { getFilterEffect } from '../edit_photo.js';

const template = document.querySelector('#picture').content.querySelector('a');
let fragment;

function renderPictures(photosData) {
  fragment = document.createDocumentFragment();

  photosData.forEach((photo, idx) => {
    const picture = createPicture(photo, idx);
    fragment.append(picture);
  });

  document.querySelector('.pictures').append(fragment);
}

function clearPictures() {
  document.querySelectorAll('.picture').forEach((picture) => picture.remove());
}

function createPicture(photo, idx) {
  const picture = template.cloneNode(true);
  const img = picture.querySelector('img');

  img.src = photo.url;
  img.alt = photo.description;
  picture.dataset.idx = idx;
  picture.querySelector('.picture__comments').textContent = photo.comments.length;
  picture.querySelector('.picture__likes').textContent = photo.likes;

  return picture;
}

const editPhotoPreview = document.querySelector('.img-upload__preview img');
function createPictureFromPreview(description, scale, effect, effectLevel) {
  const picture = template.cloneNode(true);
  const img = picture.querySelector('img');

  img.src = editPhotoPreview.src;
  img.alt = description;

  if (effect !== 'none') {
    img.style.filter = getFilterEffect(effect, effectLevel);
  }

  img.style.transform = `scale(${scale});`;

  return picture;
}

export {renderPictures, clearPictures, createPictureFromPreview};
