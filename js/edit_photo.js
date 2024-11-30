import './validation.js';

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

const onEditPhotoEscPress = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeEditPhotoModal();
  }
};

function closeEditPhotoModal() {
  editPhotoModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEditPhotoEscPress);
  filePicker.value = null;
}

filePicker.addEventListener('change', (evt) => {
  if (!evt.target.files.length) {
    return;
  }

  editPhotoModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  effectLevel.classList.add('hidden');
  document.addEventListener('keydown', onEditPhotoEscPress);
  editPhotoCancel.addEventListener('click', closeEditPhotoModal);

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
    scale = Math.max(25, scale - 25);
  } else if (evt.target === scaleBigger) {
    scale = Math.min(100, scale + 25);
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

effectLevelSlider.noUiSlider.on('update', () => {
  const value = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = value;

  const effect = document.querySelector('.effects__radio:checked').value;
  switch (effect) {
    case 'chrome':
      editPhotoPreview.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      editPhotoPreview.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      editPhotoPreview.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      editPhotoPreview.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      editPhotoPreview.style.filter = `brightness(${value})`;
      break;
    default:
      editPhotoPreview.style.filter = '';
      break;
  }
});
