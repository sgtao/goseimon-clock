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
}

