const ESCAPE_KEY_CODE = 27;
const bigPicture = document.querySelector('.big-picture');

const onPopupEscPress = (evt) => {
  if (evt.keyCode === ESCAPE_KEY_CODE) {
    closeFullPicture();
  }
};

function showFullPictureHandler(photosData) {
  return (event) => {
    const picture = event.target.closest('.picture');
    const photo = photosData[picture.dataset.idx];
    const img = bigPicture.querySelector('img');

    img.src = photo.url;
    img.alt = photo.description;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.social__comment-shown-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__comment-total-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.description;

    const list = bigPicture.querySelector('.social__comments');
    list.innerHTML = '';
    photo.comments.forEach((comment) => {
      const li = `<li class="social__comment">
        <img
          class="social__picture"
          src="${comment.avatar}"
          alt="${comment.name}"
          width="35" height="35">
        <p class="social__text">${comment.message}</p>
      </li>`;
      list.insertAdjacentHTML('beforeend', li);
    });

    bigPicture.classList.remove('hidden');
    hideCommentsCounterAndLoader();
    document.querySelector('body').classList.add('modal-open');

    bigPicture.querySelector('.big-picture__cancel').addEventListener('click', () => {
      closeFullPicture();
    });

    document.addEventListener('keydown', onPopupEscPress);
  };
}

function closeFullPicture() {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscPress);
}

function hideCommentsCounterAndLoader() {
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
}

export {showFullPictureHandler};
