let fs = require('fs');

let sec = 0;
let min = 0;
let hour = 0;
const finalFormatArray = [['Timecode In', 'Timecode Out', 'Subtitle']];

const prependZero = time => {
  if (time < 10) {
    time = '0' + time;
  }

  return time;
};

const TIMER_DURATION = 601; // 10 mins 1 sec gives 00:00 - 10:00

for (let x = 0; x < TIMER_DURATION; x++) {
  if (sec === 60) {
    sec = 0;
    min++;
  }

  if (min === 60) {
    min = 0;
    hour++;
  }

  let formatedInSec = sec;
  let formatedOutSec = sec + 1;
  let formatedInMin = min;
  let formatedOutMin = min;
  let formatedInHour = hour;
  let formatedOutHour = hour;

  if (formatedOutSec === 60) {
    formatedOutSec = 0;
    formatedOutMin++;
  }

  if (formatedOutMin === 60) {
    formatedOutMin = 0;
    formatedOutHour++;
  }

  formatedInSec = prependZero(formatedInSec);
  formatedOutSec = prependZero(formatedOutSec);
  formatedInMin = prependZero(formatedInMin);
  formatedOutMin = prependZero(formatedOutMin);
  formatedInHour = prependZero(formatedInHour);
  formatedOutHour = prependZero(formatedOutHour);

  let timeInFormat = formatedInHour + ':' + formatedInMin + ':' + formatedInSec + ':00\t';
  let timeOutFormat = formatedOutHour + ':' + formatedOutMin + ':' + formatedOutSec + ':00\t';
  let subTitleFormat =
    hour > 0 ? formatedInHour + ':' + formatedInMin + ':' + formatedInSec : formatedInMin + ':' + formatedInSec;

  finalFormatArray.push([timeInFormat + timeOutFormat + subTitleFormat]);

  sec++;
}

const tsvData = finalFormatArray.map(row => row.join('\t')).join('\n');

fs.writeFile('timecode.tsv', tsvData, 'utf8', err => {
  if (err) {
    console.log('Some error', err);
  } else {
    console.log('file saved');
  }
});
