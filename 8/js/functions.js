function validStr(str, maxLen) {
  return str.length <= maxLen;
}


function checkPalindrome(str) {
  str = str.toLowerCase().replaceAll(' ', '');
  return str === str.split('').reverse().join('');
}

function extractDigit(input) {
  const extract = (str) => {
    const res = '';
    for (const i = 0; i < str.length; i++) {
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

function checkMeetings(startWork, endWork, startMeeting, meetingDuration) {
  const start = startWork.split(':');
  const end = endWork.split(':');
  const meeting = startMeeting.split(':');

  const startWorkTime = Number(start[0]) * 60 + Number(start[1]);
  const endWorkTime = Number(end[0]) * 60 + Number(end[1]);
  const startMeetingTime = Number(meeting[0]) * 60 + Number(meeting[1]);
  const endMeetingTime = startMeetingTime + meetingDuration;

  if (startMeetingTime < startWorkTime || endMeetingTime > endWorkTime) {
    return false;
  }
  return true;
}
