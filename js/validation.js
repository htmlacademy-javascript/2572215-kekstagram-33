import { COMMENT_SYMBOLS_LIMIT, ERR_MSGS, HASHTAG_REGEX, HASHTAGS_LIMIT } from './constants.js';

const editPhotoForm = document.querySelector('fieldset.img-upload__text');
const hashtagInput = editPhotoForm.querySelector('.text__hashtags');
const commentInput = editPhotoForm.querySelector('.text__description');

const pristine = new Pristine(editPhotoForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const hasDuplicates = (arr) => arr.length <= 1 ? false : new Set(arr).size !== arr.length;

const checkRegex = (value) => {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = value.trim().split(' ');
  return hashtags.every((hashtag) => HASHTAG_REGEX.test(hashtag));
};

const checkDuplicate = (value) => {
  const hashtags = value.trim().split(' ');
  return !hasDuplicates(hashtags);
};

const checkLimit = (value) => {
  const hashtags = value.trim().split(' ');
  return !(hashtags.length > HASHTAGS_LIMIT);
};

const checkLengthLimit = (value) => value.length <= COMMENT_SYMBOLS_LIMIT;

pristine.addValidator(hashtagInput, checkRegex, ERR_MSGS.INVALID_HASHTAG);
pristine.addValidator(hashtagInput, checkDuplicate, ERR_MSGS.DUPLICATE_HASTAG);
pristine.addValidator(hashtagInput, checkLimit, ERR_MSGS.LIMIT_HASTAG);
pristine.addValidator(commentInput, checkLengthLimit, ERR_MSGS.LONG_COMMENT);


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
