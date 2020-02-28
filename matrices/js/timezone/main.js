const mst = document.querySelector('.mst');
const mstHour = document.querySelector('.mst_hour');
const utc = document.querySelector('.utc');

// UTC open and close times in 24 hour format
const utcOpenTime = 14; // utc 2:00 pm
const utcCloseTime = 4; // utc 4:00 am

const localTime = new Date();
// getTimezoneOffest returns mins. convert to hours
const utcOffset = localTime.getTimezoneOffset() / 60;

// convert local time
const localOpenTime = getLocalTime(utcOffset, utcOpenTime);
const localCloseTime = getLocalTime(utcOffset, utcCloseTime);

// convert utc
const convertedOpenUtc = getLocalTime(0, utcOpenTime);
const convertedCloseUtc = getLocalTime(0, utcCloseTime);

// display to screen
mst.innerHTML = `${utcOffset} hours`;
mstHour.innerHTML = `${localOpenTime} - ${localCloseTime}`;
utc.innerHTML = `${convertedOpenUtc} - ${convertedCloseUtc}`;

/**
 * @param {int} utcOffset 
 * offset of local time to UTC
 * @param {int} utcTime 
 * UTC time
 * 
 * convert difference of utcOffset to utcTime
 * and append appropriate am/pm
 * 
 * @return {string} time
 */
function getLocalTime(utcOffset, utcTime) {
    let time = -(utcOffset) + utcTime;

    // keeps time in 24 hour format
    if (time < 0) {
        let temp = time;
        time = 24 + temp;
    }

    // convert from 24 hour format to am/pm
    if (time < 12) {
        time += ":00 am";
    } else {
        time = time === 12 ? `${time}:00 pm` : `${time - 12}:00 pm`;
    }
    
    return time;
}