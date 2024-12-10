export const SHOWN_COMMENTS_COUNT = 5;
export const SCALE_STEP = 25;
export const SCALE_MIN = 25;
export const SCALE_MAX = 100;

export const SERVER_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
export const GET_DATA_ENDPOINT = `${SERVER_URL}/data`;

export const HASHTAG_REGEX = /^#[a-zа-я0-9]{1,19}$/i;
export const COMMENT_SYMBOLS_LIMIT = 140;
export const HASHTAGS_LIMIT = 5;

export const ERR_MSGS = {
  INVALID_HASHTAG : 'Введен невалидный хэш-тег',
  DUPLICATE_HASTAG : 'Хэш-теги не должны повторяться',
  LIMIT_HASTAG : 'Превышен максимальный лимит хэш-тегов',
  LONG_COMMENT : 'Длина комментария не может составлять больше 140 символов'
};

export const ESCAPE_KEY_CODE = 27;
