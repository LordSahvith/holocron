function startTimer() {
    let countDownDuration = 666;
    let timer = document.querySelector('#countDownTimer');
    timer.innerHTML = countDownDuration;

    // UPDATE COUNTDOWN EVERY 1 SECOND
    let countDown = setInterval(function () {
        timer.innerHTML = --countDownDuration;

        if (countDownDuration <= 0) {
            clearInterval(countDown);
            timer.innerHTML = "Game Time!";
        }
    }, 1000);
}

window.onload = function() {
    startTimer();
};