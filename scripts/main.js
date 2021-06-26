'use strict'

function TimerWatchCountUp(startTime) {
    let timerId = setTimeout(function () {
      let elapsedTime = Date.now() - startTime;
      // Update Watch
      let total_sec = Math.floor(elapsedTime / 1000);
      let sec = total_sec % 60;
      let min = Math.floor(total_sec / 60) % 60;
      let hrs = Math.floor(total_sec / 3600);
      let msec = this.elapsedTime % 1000;
      let startTime_str = this.startTime;
      msec = ('00' + msec).slice(-2);
      this.watch.textContent = hrs + ':' + min + ':' + sec + '.' + msec + ' from ' + startTime_str;
      // this();
    }, 20);
}


/*
    カウントダウンタイマー　コンストラクタ
*/
var timerCountDown = function (sec) {
  this.sec = sec;
  this.timerId = null;
  console.log("timerCountDown: " + this.sec);
}

/*
    class   : カウントダウンタイマー
    method  : 秒を減らす
*/
timerCountDown.prototype.countTime = function () {
  this.sec--;
  console.log("countTime: " + this.sec);
  if (this.sec <= 0) this.completeTime();
}

/*
    class   : カウントダウンタイマー
    method  : タイマー開始
*/
timerCountDown.prototype.startTime = function () {
  console.log("startTime: " + this.sec);
  var self = this;
  this.timerId = setInterval(function () { self.countTime() }, 1000);
}

/*
    class   : カウントダウンタイマー
    method  : タイマー停止
*/
timerCountDown.prototype.stopTime = function () {
  console.log("stopTime: " + this.sec);
  clearInterval(this.timerId);
}

/*
    class   : カウントダウンタイマー
    method  : タイマー完了
*/
timerCountDown.prototype.completeTime = function () {
  console.log("completeTime: " + this.sec);
  clearInterval(this.timerId);
}

var cd = new timerCountDown(5);     //インスタンス生成
cd.startTime();



class TimerWatch {
  constructor(el_timer, el_clock, el_ctrl) {
    this.elm_timer = document.querySelector(el_timer);
    this.elm_clock = document.querySelector(el_clock);
    this.elm_ctrl = document.querySelector(el_ctrl);
    this.timerId = null;
    this.isTimerRunning = false;
    this.startTime = 0;
    this.startTime_str = '0:0:0.00';
    this.elapsedTime = 0;
    // initial state timer and clock
    this.elm_timer.textContent = '0:0:0.00';
  }
  show_clock() {
    let dd = new Date();
    this.elm_clock.innerHTML = dd.toLocaleString();
  }
  countmsec2time_str(msec_count) {
    let time_str = "";
    let total_sec = msec_count / 1000;
    let sec = total_sec % 60;
    let min = Math.floor(total_sec / 60) % 60;
    let hrs = Math.floor(total_sec / 3600) % 24;
    // let msec = (msec_count % 1000);
    let msec = ('00' + (msec_count % 1000));
    // msec = msec.slice(-2);
    return hrs + ':' + min + ':' + sec + '.' + msec;
  }
  updateTimerText() {
    // Update Timer
    let elapsedTime = Date.now() - this.startTime;
    let elapsedTime_str = this.countmsec2time_str(elapsedTime);
    this.elm_timer.textContent = elapsedTime_str + ' from ' + this.startTime_str;
  }
  /*
      method  : タイマー開始
      refer to https://yyengine.jp/blog/javascript/javascript-timer/
  */
  startTimer () {
    let dd = new Date();
    this.startTime_str = dd.toLocaleString();
    this.startTime = Date.now();
    console.log("startTime: " + this.startTime_str);
    this.countupTimer();
  }
  countupTimer() {
    var self = this;
    this.timerId = setTimeout(function () {
      self.updateTimerText();
      self.countupTimer();
    }, 20);
  }
  /*
      method  : タイマー停止
  */
  stopTimer () {
    console.log("stopTime: " + Date.toLocaleString());
    clearInterval(this.timerId);
  }

}


{
  var start = document.getElementById('start');
  var stop = document.getElementById('stop');
  var clock = document.getElementById('digital-clock');
  var watch = document.getElementById('stop-watch');
  var startTime, elapsedTime, targetTime;
  var startTime_str = "";
  var isStarted = false;
  var timerId;



  function toggleStartStop() {
    if (isStarted === false) { // Stop to Start procedure
      isStarted = true;
      let dd = new Date();
      startTime = Date.now();
      startTime_str = dd.toLocaleTimeString();
      start.className = 'is-hidden';
      stop.className = '';
      clock.className = 'clock';
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

  
  /* window actions */
  window.onload = function () {
    // show digital-clock at Page Top
    let timerwatch = new TimerWatch('#stop-watch', '#digital-clock', '.bottons');
    // Short-cut Keymap definition
    document.addEventListener('keypress', (event) => {
      let keyName = event.key;
      console.log("detect press" + `keydown:${keyName}`);
      if ((keyName === "S")||(keyName === "s")) { 
        if (timerwatch.isTimerRunning === false) {
          timerwatch.isTimerRunning = true;
          timerwatch.startTimer();
        } else {
          timerwatch.stopTimer();
        }
      }
    });
    // show digital-clock at Page Top
    window.setInterval(function () {
      timerwatch.show_clock();
    }, 500);
  }

}