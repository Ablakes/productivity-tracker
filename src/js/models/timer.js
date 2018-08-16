export default class Timer {
  constructor(elem) {
    this.time = 0;
    this.isOn = false;
    this.offset;
    this.interval;
    this.elem = elem;
  }

  update() {
    if (this.isOn) {
      this.time += this.delta();
    }
    this.elem.textContent = this.timeFormatter(this.time);
    return this.time;
  }

  delta() {
    //delta just means change
    let newTime = Date.now();
    //This gives us a time in milliseconds. We'll calculate the timePassed and pass that into a Date object to gain access to getMinutes() getSeconds() etc. This will make formatting easier.
    let timePassed = newTime - this.offset;
    this.offset = newTime;
    return timePassed;
  }

  timeFormatter(time) {
    let milliseconds = Math.floor((time % 1000) / 10),
      seconds = Math.floor((time / 1000) % 60),
      minutes = Math.floor((time / (1000 * 60)) % 60),
      hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    //The modulo makes sure to cut off the hours at 24, minutes at 60, etc. Ex: 12%24 returns 12, whereas 36%24 returns 12 (because it's been 1 day and 12 hours).
    //Math.floor is important because any number less than 1 means that it hasn't reached the trigger point to add another digit to that denomination.

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

    return hours + " : " + minutes + " : " + seconds + " : " + milliseconds;
  }

  start() {
    if (!this.isOn) {
      this.interval = setInterval(this.update.bind(this), 10);
      this.offset = Date.now();
      this.isOn = true;
    }
  }

  stop() {
    if (this.isOn) {
      clearInterval(this.interval); //stops the setInterval function
      this.isOn = false;
    }
  }

  returnTime() {
    return this.time;
  }
}
