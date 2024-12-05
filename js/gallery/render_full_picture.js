import { renderPictures } from './render.js';

const ESCAPE_KEY_CODE = 27;
const SHOWN_COMMENTS_COUNT = 5;
const bigPicture = document.querySelector('.big-picture');

const onPopupEscPress = (evt) => {
  if (evt.keyCode === ESCAPE_KEY_CODE) {
    closeFullPicture();
  }
};

const showComments = (list, comments, start, count) => {
  const end = Math.min(start + count, comments.length);
  for (let i = start; i < end; i++) {
    const comment = comments[i];
    const li = `<li class="social__comment">
      <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35" height="35">
      <p class="social__text">${comment.message}</p>
    </li>`;
    list.insertAdjacentHTML('beforeend', li);
  }

  return end - start;
};

function showFullPictureHandler(photosData) {
  renderPictures(photosData);

  return (event) => {
    const picture = event.target.closest('.picture');
    if (!picture) {
      return;
    }

    const photo = photosData[picture.dataset.idx];
    const img = bigPicture.querySelector('img');
    const commentsLength = photo.comments.length;

    img.src = photo.url;
    img.alt = photo.description;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.social__comment-shown-count').textContent = (commentsLength <= SHOWN_COMMENTS_COUNT) ? commentsLength : SHOWN_COMMENTS_COUNT;
    bigPicture.querySelector('.social__comment-total-count').textContent = commentsLength;
    bigPicture.querySelector('.social__caption').textContent = photo.description;

    const list = bigPicture.querySelector('.social__comments');
    list.innerHTML = '';

    const shown = showComments(list, photo.comments, 0, SHOWN_COMMENTS_COUNT);
    if (shown === commentsLength) {
      bigPicture.querySelector('.comments-loader').classList.add('hidden');
    } else {
      bigPicture.querySelector('.comments-loader').classList.remove('hidden');
    }

    bigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');

    bigPicture.querySelector('.comments-loader').onclick = () => {
      const shownCommentsElement = bigPicture.querySelector('.social__comment-shown-count');
      const currPhoto = photosData[picture.dataset.idx];
      const currCommentsLength = currPhoto.comments.length;

      if (list.children.length < currCommentsLength) {
        const start = Number(shownCommentsElement.textContent);
        const count = showComments(list, currPhoto.comments, start, SHOWN_COMMENTS_COUNT);

        shownCommentsElement.textContent = start + count;

        if (list.children.length === currCommentsLength) {
          bigPicture.querySelector('.comments-loader').classList.add('hidden');
        }
      }
    };
    bigPicture.querySelector('.big-picture__cancel').addEventListener('click', closeFullPicture);
    document.addEventListener('keydown', onPopupEscPress);
  };
}

function closeFullPicture() {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscPress);
}

export {showFullPictureHandler};
