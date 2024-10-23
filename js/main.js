const descriptions = [
  'На этом фото запечатлена величественная красота зимнего леса.',
  'Солнечные лучи пробиваются сквозь листву, создавая волшебный узор.',
  'Озеро отражает небо, словно огромное зеркало.',
  'Уютный уголок с камином и креслом, идеален для чтения.',
  'Закат окрасил небо в потрясающие оттенки оранжевого и розового.',
  'Горы под снежной шапкой выглядят величественно и неприступно.',
  'Река спокойно течет между зелеными берегами, создавая атмосферу спокойствия.',
  'Город засыпает, погружаясь в мягкий свет уличных фонарей.'
];
const commentDescriptions = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const commentatorNames = [
  'Иван',
  'Петр',
  'Сергей',
  'Анна',
  'Мария',
  'Екатерина',
  'Наталья',
  'Владимир',
  'Илья',
  'Александр',
  'Андрей',
  'Виктор',
  'Антон',
];

function genPhotos(length = 25) {
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

function getRndItemFromArr(array, count = 1) {
  const res = [];
  for (let i = 0; i < count; i++) {
    res.push(array[getUniqueInt(0, array.length - 1, array)]);
  }
  return res.join(' ');
}

function getUniqueInt(min, max, array) {
  let id = getRandomInt(min, max);
  while (array.includes(id)) {
    id = getRandomInt(1, 25);
  }
  return id;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let test = genPhotos(2);
console.log(test, test[0].comments);
