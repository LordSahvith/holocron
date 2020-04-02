const mst = document.querySelector('.mst');
const mstHour = document.querySelector('.mst_hour');
const utc = document.querySelector('.utc');
const timeZones = document.querySelectorAll('.time-zone');

// UTC open and close times in 24 hour format
const utcOpenTime = 14; // utc 2:00 pm / 13 for daylight savings
const utcCloseTime = 4; // utc 4:00 am / 3 for daylight savings

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
function getLocalTime(utcOffset, utcTime, isHalfHour) {
    let time = -(utcOffset) + utcTime;

    // keeps time in 24 hour format
    if (time < 0) {
        let temp = time;
        time = 24 + temp;
    }

    // convert from 24 hour format to am/pm
    if (time < 12) {
        time += "&nbsp;am";
    } else {
        if (!isHalfHour) {
            time = time === 12 ? `${time}&nbsp;pm` : `${time - 12}&nbsp;pm`;
        } else {
            time = time === 12 ? `${time}:30&nbsp;pm` : `${time - 12}:30&nbsp;pm`;
        }
    }
    
    return time;
}

function getTimeZone() { 
    let zone = /\((.*)\)/.exec(new Date().toString())[1];
    let matches = zone.match(/\b(\w)/g);
    let acronym = matches.join('');
    return acronym;
}

timeZones.forEach(zone => zone.innerHTML = getTimeZone());