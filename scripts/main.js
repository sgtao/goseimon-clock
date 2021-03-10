'use strict'

{
  var start = document.getElementById('start');
  var stop = document.getElementById('stop');
  var clock = document.getElementById('digital-clock');
  var watch = document.getElementById('stop-watch');
  var startTime, elapsedTime, targetTime;
  var startTime_str = "";
  var isStarted = false;
  var timerId;

  function updateTimerText() {
    let total_sec = Math.floor(elapsedTime / 1000);
    let sec = total_sec % 60;
    let min = Math.floor(total_sec / 60) % 60;
    let hrs = Math.floor(total_sec / 3600);
    let msec = elapsedTime % 1000;
    msec = ('00' + msec).slice(-2);
    watch.textContent = hrs + ':' + min + ':' + sec + '.' + msec + ' from ' + startTime_str;
  }

  function countUp() {
    if (isStarted === false) {
      return;
    }
    timerId = setTimeout(function () {
      elapsedTime = Date.now() - startTime;
      updateTimerText();
      countUp();
    }, 20);
  }

  function toggleStartStop() {
    if (isStarted === false) { // Stop to Start procedure
      isStarted = true;
      let dd = new Date();
      startTime = Date.now();
      startTime_str = dd.toLocaleTimeString();
      start.className = 'is-hidden';
      stop.className = '';
      clock.className = 'is-hidden';
      watch.className = 'running';
      countUp();
    } else {  // Start to Stop procedure
      let resultTime, diff;
      isStarted = false;
      clearTimeout(timerId);
      stop.className = 'is-hidden';
      start.className = '';
      clock.className = 'clock';
      watch.className = 'result';
    }
  }

  start.addEventListener('click', function () {
    if (isStarted === true) { return; } 
    toggleStartStop();
  });

  stop.addEventListener('click', function () {
    if (isStarted === false) { return; }
    toggleStartStop();
  });

  // Short-cut Keymap definition
  document.addEventListener('keypress', (event) => {
    let keyName = event.key;
    console.log("detect press" + `keydown:${keyName}`);
    if ((keyName === "S")||(keyName === "s")) { toggleStartStop(); }
  });

  /* window actions */
  window.onload = function () {
    // show digital-clock at Page Top
    window.setInterval(function () {
      let dd = new Date();
      document.getElementById("digital-clock").innerHTML = dd.toLocaleString();
    }, 1000);
  }

}