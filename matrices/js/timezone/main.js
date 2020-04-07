// REGULAR OPEN/CLOSE TIMES
// const chatOpenTimeUTC     = 14;
// const chatCloseTimeUTC    = 4;
// const chatSatOpenTimeUTC  = 13;
// const chatSatCloseTimeUTC = 23;  
// const phoneOpenTimeUTC    = 14;
// const phoneCloseTimeUTC   = 1;

// DAYLIGHT OPEN/CLOSE TIMES
const chatOpenTimeUTC     = 13; 
const chatCloseTimeUTC    = 3;
const chatSatOpenTimeUTC  = 14;
const chatSatCloseTimeUTC = 22;  
const phoneOpenTimeUTC    = 13;
const phoneCloseTimeUTC   = 24;

// MOUNTAIN STANDARD TIMEZONES
const MTTimeZones = ["MDTs", "MSTs", "MTs"];

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

chatTime.innerHTML = `${localChatOpenTime} - ${localChatCloseTime} ${getTimeZone()}`;
chatTimeSat.innerHTML = `${localChatSatOpenTime} - ${localChatSatCloseTime} ${getTimeZone()}`;
phoneTime.innerHTML = `${localPhoneOpenTime} - ${localPhoneCloseTime} ${getTimeZone()}`;

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

    // converts negative number to correct 24 hour equivalent
    if (time < 0) {
        let temp = time;
        time = 24 + temp;
    }

    if (americanFormat.includes(getTimeZone())) {
        time = convertToAmPm(time, isHalfHour);
    } else {
        time = convertTo24Hour(time, isHalfHour);
    }
    
    return time;
}

function convertToAmPm(timeToConvert, isHalfHour) {
    let time = timeToConvert;

    // check if time needs :30 appended
    if (!isHalfHour) {
        if (time >= 12) {
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

function getTimeZone() { 
    let zone = /\((.*)\)/.exec(new Date().toString())[1];
    let matches = zone.match(/\b(\w)/g);
    let acronym = matches.join('');
    return acronym;
}













// const offset = document.querySelector('.offset');
// const hour = document.querySelector('.hour');
// const phoneHour = document.querySelector('.phone-hour');
// const satHour = document.querySelector('.sat-hour');
// const utc = document.querySelector('.utc');
// const phoneUtc = document.querySelector('.phone-utc');
// const utcSat = document.querySelector('.utc-sat');
// const timeZones = document.querySelectorAll('.time-zone');

// const americanFormat = ['MDT', 'MST'];

/**
 * UTC Chat open and close times in 24 hour format
 * (daylight / reg)
 * open      : 13 / 14 - 1p / 2p
 * close     : 3 / 4  - 3a / 4a
 * open sat  : 14 / 15 - 2p / 3p
 * close sat : 22 / 23 - 10:30p / 11:30p
 */
// const utcOpenTimeChat = 13;
// const utcCloseTimeChat = 3; 
// const utcOpenTimeSatChat = 14;
// const utcCloseTimeSatChat = 22;

/**
 * UTC Phone open and close times in 24 hour format
 * (daylight / reg)
 * open      : 13 / 14 - 1p / 2p
 * close     : 24 / 1  - 12a / 1a
 */
// const utcOpenTimePhone = 13;
// const utcCloseTimePhone = 24; 

// // get users time zone
// const localTime = new Date();
// const utcOffset = localTime.getTimezoneOffset() / 60; // convert mins to hours

// // convert utc
// const convertedOpenUtc = getLocalTime(0, utcOpenTimeChat, false);
// const convertedCloseUtc = getLocalTime(0, utcCloseTimeChat, false);
// const convertedOpenUtcSat = getLocalTime(0, utcOpenTimeSatChat, false);
// const convertedCloseUtcSat = getLocalTime(0, utcCloseTimeSatChat, true);
// const convertedOpenUtcPhone = getLocalTime(0, utcOpenTimePhone, false);
// const convertedCloseUtcPhone = getLocalTime(0, utcCloseTimePhone, false);

// // convert local time
// var localOpenTimeChat =  getLocalTime(utcOffset, utcOpenTimeChat, false);
// var localCloseTimeChat = getLocalTime(utcOffset, utcCloseTimeChat, false);
// var localOpenTimeSatChat = getLocalTime(utcOffset, utcOpenTimeSatChat, false);
// var localCloseTimeSatChat = getLocalTime(utcOffset, utcCloseTimeSatChat, true);
// var localOpenTimeSatPhone = getLocalTime(utcOffset, utcOpenTimePhone, false);
// var localCloseTimeSatPhone = getLocalTime(utcOffset, utcCloseTimePhone, false);
// if (getTimeZone() === "MST" || getTimeZone() === "MDT") {
//     localOpenTimeChat      = "7&nbsp;am";
//     localCloseTimeChat     = "9&nbsp;pm";
//     localOpenTimeSatChat   = "8&nbsp;am";
//     localCloseTimeSatChat  = "4:30&nbsp;pm";
//     localOpenTimeSatPhone  = "7&nbsp;am";
//     localCloseTimeSatPhone = "6&nbsp;pm";   
// }

// // display to screen
// offset.innerHTML = `${utcOffset} hours`;
// hour.innerHTML = `${localOpenTimeChat} - ${localCloseTimeChat}`;
// phoneHour.innerHTML = `${localOpenTimeSatPhone} - ${localCloseTimeSatPhone}`;
// satHour.innerHTML = `${localOpenTimeSatChat} - ${localCloseTimeSatChat}`;
// utc.innerHTML = `${convertedOpenUtc} - ${convertedCloseUtc}`;
// phoneUtc.innerHTML = `${convertedOpenUtcPhone} - ${convertedCloseUtcPhone}`;
// utcSat.innerHTML = `${convertedOpenUtcSat} - ${convertedCloseUtcSat}`;

// /**
//  * @param {int} utcOffset 
//  * offset of local time to UTC
//  * @param {int} utcTime 
//  * UTC time
//  * 
//  * convert difference of utcOffset to utcTime
//  * and append appropriate am/pm
//  * 
//  * @return {string} time
//  */
// function getLocalTime(utcOffset, utcTime, isHalfHour) {
//     let time = -(utcOffset) + utcTime;
//     console.log(time);

//     // converts negative number to correct 24 hour equivalent
//     if (time < 0) {
//         let temp = time;
//         time = 24 + temp;
//     }

//     if (americanFormat.includes(getTimeZone())) {
//         time = convertToAmPm(time, isHalfHour);
//     } else {
//         time = convertTo24Hour(time, isHalfHour);
//     }
    
//     return time;
// }

// function convertToAmPm(timeToConvert, isHalfHour) {
//     let time = timeToConvert;

//     // convert am/pm check if time needs :30 appended
//     if (!isHalfHour) {
//         if (time >= 12) {
//             time = time === 12 ? `${time}&nbsp;pm` : `${time - 12}&nbsp;pm`; // TODO: prints pm when it's midnight
//         } else {
//             time += "&nbsp;am";
//         }
//     } else {
//         if (time >= 12) {
//             time = time === 12 ? `${time}:30&nbsp;pm` : `${time - 12}:30&nbsp;pm`;
//         } else {
//             time += ":30&nbsp;am";
//         }
//     }
//     return time;
// }

// function convertTo24Hour(timeToConvert, isHalfHour) {
//     let time = timeToConvert;

//     // convert am/pm check if time needs :30 appended
//     if (!isHalfHour) {
//         if (time < 12) {
//             time = `0${time}00`;
//         } else {
//             time += "00";
//         }
//     } else {
//         if (time < 12) {
//             time = `0${time}30`;
//         } else {
//             time += "30";
//         }
//     }
//     return time;
// }

// function getTimeZone() { 
//     let zone = /\((.*)\)/.exec(new Date().toString())[1];
//     let matches = zone.match(/\b(\w)/g);
//     let acronym = matches.join('');
//     return acronym;
// }

// timeZones.forEach(zone => zone.innerHTML = getTimeZone());