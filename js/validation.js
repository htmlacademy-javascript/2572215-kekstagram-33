const editPhotoForm = document.querySelector('fieldset.img-upload__text');
const hashtagInput = editPhotoForm.querySelector('.text__hashtags');
const commentInput = editPhotoForm.querySelector('.text__description');

const pristine = new Pristine(editPhotoForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const hasDuplicates = (arr) => arr.length <= 1 ? false : new Set(arr).size !== arr.length;
const hashtagRegex = /^#[a-zа-я0-9]{1,19}$/i;

// Valid hashtag validator
pristine.addValidator(hashtagInput, (value) => {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = value.trim().split(' ');
  return hashtags.every((hashtag) => hashtagRegex.test(hashtag));
}, 'Введен невалидный хэш-тег');

// Duplicate validator
pristine.addValidator(hashtagInput, (value) => {
  const hashtags = value.trim().split(' ');
  if (hasDuplicates(hashtags)) {
    return false;
  }
  return true;
}, 'Хэш-теги не должны повторяться');

// Max limit validator
pristine.addValidator(hashtagInput, (value) => {
  const hashtags = value.trim().split(' ');
  if (hashtags.length > 5) {
    return false;
  }
  return true;
}, 'Превышен максимальный лимит хэш-тегов');

// Comment validator
pristine.addValidator(commentInput, (value) => value.length <= 140,
  'Длина комментария не может составлять больше 140 символов');

[hashtagInput, commentInput].forEach((input) => {
  input.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      evt.stopPropagation();
    }
  });
});

const validateForm = () => pristine.validate();

const returnToDefault = () => {
  hashtagInput.value = '';
  commentInput.value = '';
  pristine.reset();
};

export { returnToDefault, validateForm };
