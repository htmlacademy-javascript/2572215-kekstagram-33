import './validation.js';

const filePicker = document.querySelector('#upload-file');
const editPhotoModal = document.querySelector('.img-upload__overlay');
const editPhotoPreview = document.querySelector('.img-upload__preview img');
const editPhotoCancel = document.querySelector('.img-upload__cancel');

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
  document.addEventListener('keydown', onEditPhotoEscPress);
  editPhotoCancel.addEventListener('click', closeEditPhotoModal);

  const reader = new FileReader();
  reader.onload = () => {
    editPhotoPreview.src = reader.result;
  };
  reader.readAsDataURL(evt.target.files[0]);
});

