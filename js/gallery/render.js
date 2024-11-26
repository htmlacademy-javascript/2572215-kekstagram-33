const template = document.querySelector('#picture').content.querySelector('a');

function renderPictures(photosData) {
  const fragment = document.createDocumentFragment();

  photosData.forEach((photo, idx) => {
    const picture = createPicture(photo, idx);
    fragment.append(picture);
  });

  document.querySelector('.pictures').append(fragment);
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

export {renderPictures};
