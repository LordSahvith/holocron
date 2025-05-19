let fs = require('fs');

let sec = 0;
let min = 0;
let hour = 0;
let timeInFormat = '';
let timeOutFormat = '';
let subTitleFormat = '';
let finalFormatArray = [
  ['Timecode In', 'Timecode Out', 'Subtitle']
];

for (let x = 0; x < 600; x++) {
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
  let formatedOutMin = min + 1;
  let formatedInHour = hour;

  if (formatedInSec < 10) {
    formatedInSec = '0' + formatedInSec;
  }

  if (formatedOutSec < 10) {
    formatedOutSec = '0' + formatedOutSec;
  }

  if (formatedInMin < 10) {
    formatedInMin = '0' + formatedInMin;
  }

  if (formatedOutMin < 10) {
    formatedOutMin = '0' + formatedOutMin;
  }

  if (formatedInHour < 10) {
    formatedInHour = '0' + formatedInHour;
  }

  timeInFormat = formatedInHour + ':' + formatedInMin + ':' + formatedInSec + ':00';
  timeOutFormat = formatedInHour + ':' + formatedOutMin + ':' + formatedOutSec + ':00';
  subTitleFormat =
    hour > 0 ? formatedInHour + ':' + formatedInMin + ':' + formatedInSec : formatedInMin + ':' + formatedInSec;

  finalFormatArray.push([timeInFormat + timeOutFormat + subTitleFormat]);

  sec++;
}

const tsvData = finalFormatArray.map(row => row.join('\t')).join('\n');

fs.writeFile('timecode.tsv', tsvData, 'utf8', err => {
  if (err) {
    console.log('Some error');
  } else {
    console.log('file saved');
  }
});
