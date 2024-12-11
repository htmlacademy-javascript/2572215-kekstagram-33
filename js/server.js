/* eslint-disable quotes */
import { validateForm } from "./validation.js";
import { closeEditPhotoModal } from "./edit_photo.js";
import { createPictureFromPreview, onLoadedPictureClick } from "./gallery/render.js";
import { GET_DATA_ENDPOINT, SERVER_URL } from "./constants.js";

const errorGetTemplate = document
  .querySelector("#data-error")
  .content.querySelector("section");
const errorPostTemplate = document
  .querySelector("#error")
  .content.querySelector("section");
const successPostTemplate = document
  .querySelector("#success")
  .content.querySelector("section");

const showGetError = (reason) => {
  const error = errorGetTemplate.cloneNode(true);
  error.querySelector(".data-error__title").textContent = reason;
  document.body.append(error);

  setTimeout(() => {
    error.remove();
  }, 5000);
};

const showPostElement = (template, btnClass) => {
  const element = template.cloneNode(true);
  document.body.append(element);

  const onEscKeydown = (evt) => {
    if (evt.key === "Escape") {
      removeElement();
    }
  };

  const onClick = (evt) => {
    if (evt.target === element) {
      removeElement();
    }
  };

  function removeElement() {
    element.remove();
    document.removeEventListener("keydown", onEscKeydown);
    document.removeEventListener("click", onClick);
  }

  document.addEventListener("keydown", onEscKeydown);
  document.addEventListener("click", onClick);

  element
    .querySelector(`.${btnClass}`)
    .addEventListener("click", removeElement);
};

const getPhotos = () =>
  fetch(GET_DATA_ENDPOINT)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Не удалось получить данные");
    })
    .catch((reason) => {
      showGetError(reason);
    });

const form = document.querySelector("#upload-select-image");
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (!validateForm()) {
    return;
  }

  const formData = new FormData(form);
  fetch(SERVER_URL, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Не удалось отправить данные");
      }
    })
    .then((data) => {
      const { description, scale, effect } = data;
      const effectLevel = data["effect-level"];
      const picture = createPictureFromPreview(description, scale, effect, effectLevel);
      const src = picture.querySelector("img").src;

      picture.addEventListener(
        "click",
        onLoadedPictureClick(src,effectLevel, data)
      );

      document.querySelector(".pictures").append(picture);

      closeEditPhotoModal();
      showPostElement(successPostTemplate, "success__button");
    })
    .catch(() => {
      showPostElement(errorPostTemplate, "error__button");
    })
    .finally(() => {
      submitButton.disabled = false;
    });

  submitButton.disabled = true;
});

export { getPhotos };
