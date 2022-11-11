const waitTime = 5000;
const waitInterval = 500;
let currentTime = 0;

const incrementedTime = () => {
    currentTime += waitInterval;
    const timePercentage = Math.floor((currentTime / waitTime) * 100);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log(`waiting ... ${timePercentage}%`);
};

console.log(`setting a ${waitTime / 1000} second delay`);

const timerFinished = () => {
    clearInterval(interval);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log('done');
};

const interval = setInterval(incrementedTime, waitInterval);
setTimeout(timerFinished, waitTime);
