import { validateForm } from './validation.js';
import { closeEditPhotoModal } from './edit_photo.js';

const SERVER_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const GET_DATA_ENDPOINT = `${SERVER_URL}/data`;

const errorGetTemplate = document.querySelector('#data-error').content.querySelector('section');
const errorPostTemplate = document.querySelector('#error').content.querySelector('section');
const successPostTemplate = document.querySelector('#success').content.querySelector('section');

const showGetError = (reason) => {
  const error = errorGetTemplate.cloneNode(true);
  error.querySelector('.data-error__title').textContent = reason;
  document.body.append(error);

  setTimeout(() => {
    error.remove();
  }, 5000);
};

/*
  Элемент сообщения, нужно разместить перед закрывающим тегом </body>.
  Сообщение должно удаляться со страницы:
  - после нажатия на кнопку с классом 'btn_class',
  - по нажатию на клавишу Esc
  - по клику на произвольную область экрана за пределами блока с сообщением.
*/
const showPostElement = (template, btnClass) => {
  const element = template.cloneNode(true);
  document.body.append(element);

  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
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
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onClick);
  }

  document.addEventListener('keydown', onEscPress);
  document.addEventListener('click', onClick);

  element.querySelector(`.${btnClass}`).addEventListener('click', removeElement);
};

const getPhotos = () =>
  fetch(GET_DATA_ENDPOINT)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось получить данные');
    })
    .catch((reason) => {
      showGetError(reason);
    });

const form = document.querySelector('#upload-select-image');
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!validateForm()) {
    return;
  }

  const formData = new FormData(form);
  fetch(SERVER_URL, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        showPostElement(successPostTemplate, 'success__button');
      } else {
        throw new Error('Не удалось отправить данные');
      }
    })
    .catch(() => {
      showPostElement(errorPostTemplate, 'error__button');
    })
    .finally(() => {
      submitButton.disabled = false;
    });

  submitButton.disabled = true;
  closeEditPhotoModal();
});

export { getPhotos };
