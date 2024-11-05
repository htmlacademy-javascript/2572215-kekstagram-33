import {getRndItemFromArr, getRandomInt, getUniqueInt} from '../utils.js';
import {commentatorNames, commentDescriptions, descriptions} from './values.js';

const PHOTOS_COUNT = 25;

function genPhotos(length = PHOTOS_COUNT) {
  const generator = getPhotoGenerator();
  return Array.from({length: length}, generator);
}

function getPhotoGenerator() {
  const photoIDs = [];
  return function() {
    const id = getUniqueInt(1, 25, photoIDs);
    const url = `photos/${id}.jpg`;
    photoIDs.push(id);

    return {
      id : id,
      url : url,
      description : getRndItemFromArr(descriptions),
      likes : getRandomInt(15, 200),
      comments : getComments(0, 30)
    };
  };
}

function getComments(min, max) {
  const commentIDs = [];
  const generator = () => {
    const id = getUniqueInt(0, 1000, commentIDs);
    commentIDs.push(id);

    return {
      id : id,
      avatar : `img/avatar-${getRandomInt(1, 6)}.svg`,
      message : getRndItemFromArr(commentDescriptions, 2),
      name : getRndItemFromArr(commentatorNames)
    };
  };

  return Array.from({length: getRandomInt(min, max)}, generator);
}

export {genPhotos};
