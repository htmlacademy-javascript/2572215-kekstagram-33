/*eslint-disable quotes*/
import { getFilterEffect } from "../edit_photo.js";
import { ESCAPE_KEY_CODE, SHOWN_COMMENTS_COUNT } from "../constants.js";

const template = document.querySelector("#picture").content.querySelector("a");
const editPhotoPreview = document.querySelector(".img-upload__preview img");

const fullPicture = {
  src: document.querySelector(".big-picture"),
  img: document.querySelector(".big-picture img"),
  social: {
    comments: {
      list: document.querySelector(".social__comments"),
      loader: document.querySelector(".comments-loader"),
      shownCount: document.querySelector(".social__comment-shown-count"),
      totalCount: document.querySelector(".social__comment-total-count"),
    },
    likesCount: document.querySelector(".likes-count"),
    caption: document.querySelector(".social__caption"),
  },
  cancelBtn: document.querySelector(".big-picture__cancel"),
};

const onPopupEscKeydown = (evt) => {
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
    list.insertAdjacentHTML("beforeend", li);
  }

  return end - start;
};

const onCommentsLoaderClick = (list, comments) => () => {
  const currCommentsLength = comments.length;

  if (list.children.length < currCommentsLength) {
    const shownCommentsEl = fullPicture.social.comments.shownCount;
    const start = Number(shownCommentsEl.textContent);
    const count = showComments(list, comments, start, SHOWN_COMMENTS_COUNT);

    shownCommentsEl.textContent = start + count;

    if (list.children.length === currCommentsLength) {
      fullPicture.social.comments.loader.classList.add("hidden");
    }
  }
};

const onPictureClick = (photo) => () => {
  const img = fullPicture.img;
  const likesCount = fullPicture.social.likesCount;
  const commentsCount = fullPicture.social.comments.totalCount;
  const shownCommentsCount = fullPicture.social.comments.shownCount;
  const caption = fullPicture.social.caption;
  const list = fullPicture.social.comments.list;
  const commentsLength = photo.comments.length;

  img.src = photo.url;
  img.alt = photo.description;
  likesCount.textContent = photo.likes;
  shownCommentsCount.textContent =
    commentsLength <= SHOWN_COMMENTS_COUNT
      ? commentsLength
      : SHOWN_COMMENTS_COUNT;
  commentsCount.textContent = commentsLength;
  caption.textContent = photo.description;

  list.innerHTML = "";

  const shown = showComments(list, photo.comments, 0, SHOWN_COMMENTS_COUNT);
  const loader = fullPicture.social.comments.loader;
  if (shown === commentsLength) {
    loader.classList.add("hidden");
  } else {
    loader.classList.remove("hidden");
  }
  loader.onclick = onCommentsLoaderClick(
    list,
    photo.comments
  );

  fullPicture.cancelBtn.onclick = closeFullPicture;
  document.addEventListener("keydown", onPopupEscKeydown);

  fullPicture.src.classList.remove("hidden");
  document.querySelector("body").classList.add("modal-open");
};

function renderPictures(photosData) {
  const fragment = document.createDocumentFragment();

  photosData.forEach((photo, idx) => {
    const picture = createPicture(photo, idx);
    picture.addEventListener("click", onPictureClick(photo));
    fragment.append(picture);
  });

  document.querySelector('.pictures').append(fragment);
}

function clearPictures() {
  document.querySelectorAll(".picture").forEach((picture) => picture.remove());
}

function createPicture(photo, idx) {
  const picture = template.cloneNode(true);
  const img = picture.querySelector("img");

  img.src = photo.url;
  img.alt = photo.description;
  picture.dataset.idx = idx;
  picture.querySelector(".picture__comments").textContent =
    photo.comments.length;
  picture.querySelector(".picture__likes").textContent = photo.likes;

  return picture;
}

function createPictureFromPreview(description, scale, effect, effectLevel) {
  const picture = template.cloneNode(true);
  const img = picture.querySelector("img");

  img.src = editPhotoPreview.src;
  img.alt = description;

  if (effect !== "none") {
    img.style.filter = getFilterEffect(effect, effectLevel);
  }

  img.style.transform = `scale(${scale});`;

  return picture;
}

function onLoadedPictureClick(src, effectLevel, data) {
  const { description, hashtags, scale, effect } = data;
  const img = fullPicture.img;

  return () => {
    img.src = src;
    img.alt = description;

    if (effect !== "none") {
      img.style.filter = getFilterEffect(effect, effectLevel);
    }
    img.style.transform = `scale(${scale})`;

    fullPicture.social.likesCount.textContent = 0;
    fullPicture.social.comments.shownCount.textContent = 0;
    fullPicture.social.comments.totalCount.textContent = 0;
    fullPicture.social.caption.textContent = `${description} ${hashtags}`;

    fullPicture.social.comments.list.innerHTML = "";
    fullPicture.social.comments.loader.classList.add("hidden");

    fullPicture.src.classList.remove("hidden");
    document.querySelector("body").classList.add("modal-open");

    fullPicture.cancelBtn.onclick = closeFullPicture;
    document.addEventListener("keydown", onPopupEscKeydown);
  };
}

function closeFullPicture() {
  fullPicture.src.classList.add("hidden");
  document.querySelector("body").classList.remove("modal-open");

  document.removeEventListener("keydown", onPopupEscKeydown);
}

export { renderPictures, clearPictures, createPictureFromPreview, onLoadedPictureClick };
