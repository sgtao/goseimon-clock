'use strict'

/* window actions */
window.onload = function () {
  // show digital-clock at Page Top
  let clocktimer = new ClockTimer('#stop-watch', '#digital-clock', '.bottons');
  // Short-cut Keymap definition
  document.addEventListener('keypress', (event) => {
    let keyName = event.key;
    console.log("detect press" + `keydown:${keyName}`);
    if ((keyName === "S") || (keyName === "s")) {
      if (clocktimer.isTimerRunning === false) {
        clocktimer.isTimerRunning = true;
        clocktimer.startTimer();
      } else {
        clocktimer.isTimerRunning = false;
        clocktimer.stopTimer();
      }
    }
  });
  // title action
  let title = document.querySelector('.title');
  let title_icon = document.querySelector('.title-icon');
  title_icon.addEventListener('click', (event) => {
    title.classList.toggle('is-show');
    title_icon.classList.toggle('is-show');
  });

}

