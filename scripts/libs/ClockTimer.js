/* ClockTimer.js */
class ClockTimer {
  constructor(el_timer, el_clock, el_ctrl) {
    this.elm_timer = document.querySelector(el_timer);
    this.elm_clock = document.querySelector(el_clock);
    this.elm_ctrl = document.querySelector(el_ctrl);
    this.start_btn = this.elm_ctrl.querySelector('.start');
    this.stop_btn = this.elm_ctrl.querySelector('.stop');
    this.timerId = null;
    this.isTimerRunning = false;
    this.startTime = 0;
    this.startTime_str = '0:0:0.00';
    this.elapsedTime = 0;
    this.eventType = this._getEventType();
    console.log(this.eventType);
    // initial state timer and clock
    this.initialize();
    // this.elm_timer.innerHTML = this.eventType; // for debug
  }
  _getEventType() {
    return window.ontouchstart ? 'touchstart' : 'click';
  }
  initialize() {
    let self = this;
    self.elm_timer.textContent = '0:0:0.00';
    self.start_btn.addEventListener(this.eventType, function () {
      if (self.isTimerRunning === true) { return; }
      self.toggleStartStop();
    });
    self.stop_btn.addEventListener(this.eventType, function () {
      if (self.isTimerRunning === false) { return; }
      self.toggleStartStop();
    });
    // show digital-clock at Page Top
    window.setInterval(function () {
      self.show_clock();
    }, 500);
  }
  show_clock() {
    let dd = new Date();
    // let options = { time: true, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    // this.elm_clock.innerHTML = dd.toLocaleString('ja-JP', options);
    this.elm_clock.innerHTML = dd.toLocaleString('ja-JP');
  }
  countmsec2time_str(msec_count) {
    let time_str = "";
    let total_sec = msec_count / 1000;
    let sec = Math.floor(total_sec) % 60;
    let min = Math.floor(total_sec / 60) % 60;
    let hrs = Math.floor(total_sec / 3600) % 24;
    // let msec = (msec_count % 1000);
    let msec = ('00' + (msec_count % 1000)).slice(-2);
    time_str = hrs + ':' + min + ':' + sec + '.' + msec;
    // console.log(time_str);
    return time_str;
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
  startTimer() {
    let dd = new Date();
    this.start_btn.classList.add('is-hidden');
    this.stop_btn.classList.remove('is-hidden');
    this.elm_clock.className = 'clock';
    this.elm_timer.className = 'running';
    this.startTime_str = dd.toLocaleTimeString();
    console.log("startTime: " + this.startTime_str);
    var self = this;
    self.startTime = Date.now();
    self.timerId = setInterval(function () {
      self.updateTimerText();
    }, 20);
  }
  /*
      method  : タイマー停止
  */
  stopTimer() {
    this.start_btn.classList.remove('is-hidden');
    this.stop_btn.classList.add('is-hidden');
    this.elm_clock.className = 'clock';
    this.elm_timer.className = 'result';
    let dd = new Date();
    console.log("stopTime: " + dd.toLocaleTimeString());
    clearInterval(this.timerId);
  }
  // button control
  toggleStartStop() {
    if (this.isTimerRunning === false) {
      this.isTimerRunning = true;
      this.startTimer();
    } else {  // Start to Stop procedure
      let resultTime, diff;
      this.isTimerRunning = false;
      this.stopTimer();
    }
  }
}
