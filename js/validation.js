const editPhotoForm = document.querySelector('#upload-select-image');
const hashtagInput = editPhotoForm.querySelector('.text__hashtags');
const commentInput = editPhotoForm.querySelector('.text__description');

const pristine = new Pristine(editPhotoForm);

const hasDuplicates = (arr) => new Set(arr).size !== arr.length;
const hashtagRegex = /^#[a-zа-я0-9]{1,19}$/i;

pristine.addValidator(hashtagInput, (value) => {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = value.trim().split(' ');
  if (hasDuplicates(hashtags) || hashtags.length > 5) {
    return false;
  }
  return hashtags.every((hashtag) => hashtagRegex.test(hashtag));
});

[hashtagInput, commentInput].forEach((input) => {
  input.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      evt.stopPropagation();
    }
  });
});

editPhotoForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
