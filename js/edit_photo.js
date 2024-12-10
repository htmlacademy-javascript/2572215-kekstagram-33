import { SCALE_MAX, SCALE_MIN, SCALE_STEP } from './constants.js';
import { returnToDefault as textInputsToDefault } from './validation.js';

const filePicker = document.querySelector('#upload-file');
const editPhotoModal = document.querySelector('.img-upload__overlay');
const editPhotoPreview = document.querySelector('.img-upload__preview img');
const editPhotoCancel = document.querySelector('.img-upload__cancel');

const scaleValue = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');

const effectLevel = document.querySelector('.effect-level');
const effectLevelSlider = effectLevel.querySelector('.effect-level__slider');
const effectLevelValue = effectLevel.querySelector('.effect-level__value');
const effectList = document.querySelector('.effects__list');

const onPictureEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onPhotoCancelClick();
  }
};

const returnToDefault = () => {
  scaleValue.value = '100%';
  editPhotoPreview.style.transform = 'scale(1)';
  editPhotoPreview.style.filter = '';
  effectLevelValue.value = '';
  document.querySelector('#effect-none').checked = true;
};

function onPhotoCancelClick() {
  editPhotoModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPictureEscKeydown);
  editPhotoCancel.removeEventListener('click', onPhotoCancelClick);
  filePicker.value = null;

  returnToDefault();
  textInputsToDefault();
}

filePicker.addEventListener('change', (evt) => {
  if (!evt.target.files.length) {
    return;
  }

  editPhotoModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  effectLevel.classList.add('hidden');
  document.addEventListener('keydown', onPictureEscKeydown);
  editPhotoCancel.addEventListener('click', onPhotoCancelClick);

  const reader = new FileReader();
  reader.onload = () => {
    editPhotoPreview.src = reader.result;
  };
  reader.readAsDataURL(evt.target.files[0]);
});

//* Scale control
const onScaleControlClick = (evt) => {
  let scale = parseInt(scaleValue.value, 10);
  if (evt.target === scaleSmaller) {
    scale = Math.max(SCALE_MIN, scale - SCALE_STEP);
  } else if (evt.target === scaleBigger) {
    scale = Math.min(SCALE_MAX, scale + SCALE_STEP);
  }

  scaleValue.value = `${scale}%`;
  editPhotoPreview.style.transform = `scale(${scale / 100})`;
};

[scaleSmaller, scaleBigger].forEach((control) => {
  control.addEventListener('click', onScaleControlClick);
});

//* Effect level
noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

effectList.addEventListener('change', (evt) => {
  const effectElement = evt.target.closest('.effects__radio');
  if (!effectElement) {
    return;
  }

  switch (effectElement.value) {
    case 'none':
      effectLevel.classList.add('hidden');
      editPhotoPreview.style.filter = '';
      break;
    case 'chrome':
      effectLevel.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: { min: 0, max: 1 },
        start: 1,
        step: 0.1,
      });
      break;
    case 'sepia':
      effectLevel.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: { min: 0, max: 1 },
        start: 1,
        step: 0.1,
      });
      break;
    case 'marvin':
      effectLevel.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: { min: 0, max: 100 },
        start: 100,
        step: 1,
      });
      break;
    case 'phobos':
      effectLevel.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: { min: 0, max: 3 },
        start: 3,
        step: 0.1,
      });
      break;
    case 'heat':
      effectLevel.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: { min: 1, max: 3 },
        start: 3,
        step: 0.1,
      });
      break;
  }
});

const getFilterEffect = (effect, value) => {
  switch (effect) {
    case 'chrome':
      return `grayscale(${value})`;
    case 'sepia':
      return `sepia(${value})`;
    case 'marvin':
      return `invert(${value}%)`;
    case 'phobos':
      return `blur(${value}px)`;
    case 'heat':
      return `brightness(${value})`;
    default:
      return '';
  }
};

effectLevelSlider.noUiSlider.on('update', () => {
  const value = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = value;

  const effect = document.querySelector('.effects__radio:checked').value;
  editPhotoPreview.style.filter = getFilterEffect(effect, value);
});

export { onPhotoCancelClick as closeEditPhotoModal, getFilterEffect };
