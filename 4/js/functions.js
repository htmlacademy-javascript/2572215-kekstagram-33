function validStr(str, maxLen) {
  return str.length <= maxLen;
}


function checkPalindrome(str) {
  str = str.toLowerCase().replaceAll(' ', '');
  return str === str.split('').reverse().join('');
}

function extractDigit(input) {
  const extract = (str) => {
    let res = '';
    for (let i = 0; i < str.length; i++) {
      if (str[i] >= '0' && str[i] <= '9') {
        res += str[i];
      }
    }

    if (res === '') {
      return NaN;
    }
    return res;
  };

  switch (typeof input) {
    case 'number':
      return Number(extract(input.toString()));
    case 'string':
      return Number(extract(input));
  }
}
