// OPEN/CLOSE TIMES - REGULAR 
// const chatOpenTimeUTC     = 14;
// const chatCloseTimeUTC    = 4;
// const chatSatOpenTimeUTC  = 13;
// const chatSatCloseTimeUTC = 23;  
// const phoneOpenTimeUTC    = 14;
// const phoneCloseTimeUTC   = 1;

// OPEN/CLOSE TIMES - DAYLIGHT SAVINGS
const chatOpenTimeUTC     = 13; 
const chatCloseTimeUTC    = 3;
const chatSatOpenTimeUTC  = 14;
const chatSatCloseTimeUTC = 22;  
const phoneOpenTimeUTC    = 13;
const phoneCloseTimeUTC   = 24;

// MOUNTAIN STANDARD TIMEZONES
const MTTimeZones = ["MDT", "MST", "MT"];

// AMERICAN TIME FORMAT 
const americanFormat = ["MDT", "MST", "MT"];

// HTML ELEMENTS
const chatTime    = document.querySelector(".chat-time");
const chatTimeSat = document.querySelector(".chat-time-sat");
const phoneTime   = document.querySelector(".phone-time");

// GET USERS TIME ZONE
const localTime = new Date();
// CONVERT MINS TO HOURS
const utcOffset = localTime.getTimezoneOffset() / 60;

// LOCAL TIME
var localChatOpenTime;     
var localChatCloseTime;    
var localChatSatOpenTime;  
var localChatSatCloseTime 
var localPhoneOpenTime;   
var localPhoneCloseTime;   
if (!MTTimeZones.includes(getTimeZone())) {
    localChatOpenTime     = getLocalTime(utcOffset, chatOpenTimeUTC, false);
    localChatCloseTime    = getLocalTime(utcOffset, chatCloseTimeUTC, false);
    localChatSatOpenTime  = getLocalTime(utcOffset, chatSatOpenTimeUTC, false);
    localChatSatCloseTime = getLocalTime(utcOffset, chatSatCloseTimeUTC, true);
    localPhoneOpenTime    = getLocalTime(utcOffset, phoneOpenTimeUTC, false);
    localPhoneCloseTime   = getLocalTime(utcOffset, phoneCloseTimeUTC, false);
} else {
    localChatOpenTime     = "7&nbsp;am";
    localChatCloseTime    = "9&nbsp;pm";
    localChatSatOpenTime  = "8&nbsp;am";
    localChatSatCloseTime = "4:30&nbsp;pm";
    localPhoneOpenTime    = "7&nbsp;am";
    localPhoneCloseTime   = "6&nbsp;pm";   
}

/**
 * @param {int} utcOffset 
 * offset of local time to UTC
 * @param {int} utcTime 
 * UTC time
 * @param {boolean} isHalfHour
 * time has :30 min
 * 
 * convert difference of utcOffset to utcTime * 
 * @return {string} time
 */
function getLocalTime(utcOffset, utcTime, isHalfHour) {
    let time = -(utcOffset) + utcTime;

    // converts negative number to correct 24 hour equivalent
    if (time < 0) {
        let temp = time;
        time = 24 + temp;
    }

    // check which time formatting to use
    if (!americanFormat.includes(getTimeZone())) {
        tßime = convertTo24Hour(time, isHalfHour);
    } else {
        time = convertToAmPm(time, isHalfHour);
    }
    
    return time;
}

/** 
 * @param {int} timeToConvert 
 * @param {boolean} isHalfHour 
 * time has :30 min
 * 
 * convert time to am/pm format
 * @returns {string} time 
 */
function convertToAmPm(timeToConvert, isHalfHour) {
    let time = timeToConvert;

    // check if time needs :30 appended
    if (!isHalfHour) {
        if (time >= 12) {
            // check if it's midnight
            if (time !== 24) {
                time = time === 12 ? `${time}&nbsp;p.m.` : `${time - 12}&nbsp;p.m.`;
            } else {
                time = `${time - 12}&nbsp;a.m.`;
            }
        } else {
            time += "&nbsp;a.m.";
        }
    } else {
        if (time >= 12) {
            // check if it's midnight
            if (time !== 24) {
                time = time === 12 ? `${time}:30&nbsp;p.m.` : `${time - 12}:30&nbsp;p.m.`;
            } else {
                time = `${time - 12}:30&nbsp;a.m.`;
            }
        } else {
            time += ":30&nbsp;a.m.";
        }
    }
    return time;
}

/** 
 * @param {int} timeToConvert 
 * @param {boolean} isHalfHour 
 * time has :30 min
 * 
 * convert time to 24 hour format
 * @returns {string} time 
 */
function convertTo24Hour(timeToConvert, isHalfHour) {
    let time = timeToConvert;

    // heck if time needs 30 appended
    if (!isHalfHour) {
        if (time < 10) {
            time = `0${time}00`;
        } else {
            time += "00";
        }
    } else {
        if (time < 10) {
            time = `0${time}30`;
        } else {
            time += "30";
        }
    }
    return time;
}

/**
 * get time zone name and 
 * abbreviate (MDT, CET, MST, etc.)
 */
function getTimeZone() { 
    let zone = /\((.*)\)/.exec(new Date().toString())[1];
    let matches = zone.match(/\b(\w)/g);
    let acronym = matches.join('');
    return acronym;
}

// DISPLAY TO SCREEN
chatTime.innerHTML = `${localChatOpenTime} - ${localChatCloseTime} ${getTimeZone()}`;
chatTimeSat.innerHTML = `${localChatSatOpenTime} - ${localChatSatCloseTime} ${getTimeZone()}`;
phoneTime.innerHTML = `${localPhoneOpenTime} - ${localPhoneCloseTime} ${getTimeZone()}`;