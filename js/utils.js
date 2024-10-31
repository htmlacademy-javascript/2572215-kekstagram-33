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
    id = getRandomInt(min, max);
  }
  return id;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {getRndItemFromArr, getUniqueInt, getRandomInt};
