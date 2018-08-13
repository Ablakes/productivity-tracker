function Stopwatch(elem) {

    let time = 0;
    let interval;
    let offset;

    const update = () => {
        if (this.isOn) {
            time += delta();
        }
        elem.textContent = timeFormatter(time);
        return this.time;
    };
    const delta = () => {
        //delta just means change
        let newTime = Date.now();
        //This gives us a time in milliseconds. We'll calculate the timePassed and pass that into a Date object to gain access to getMinutes() getSeconds() etc. This will make formatting easier. 
        let timePassed = newTime - offset;
        offset = newTime;
        return timePassed;
    };

    const timeFormatter = (time) => {
        let milliseconds = Math.floor((time % 1000) / 10),
            seconds = Math.floor((time / 1000) % 60),
            minutes = Math.floor((time / (1000 * 60)) % 60),
            hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        //The modulo makes sure to cut off the hours at 24, minutes at 60, etc. Ex: 12%24 returns 12, whereas 36%24 returns 12 (because it's been 1 day and 12 hours).
        //Math.floor is important because any number less than 1 means that it hasn't reached the trigger point to add another digit to that denomination. 

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

        return hours + " : " + minutes + " : " + seconds + " : " + milliseconds;
    };

    this.addTime = () => {
        time += 300000;
        update();
    }
    this.subtractTime = () => {
        if (time >= 300000) {
            time -= 300000;
            update();
        } else if (time < 300000 && time > 0) {
            time = 0;
            update();
        }
    }

    this.isOn = false;

    this.returnTime = () => {
        return time;
    }

    this.start = () => {
        if (!this.isOn) {
            interval = setInterval(update, 10);
            offset = Date.now();
            this.isOn = true;
        }
    };

    this.stop = () => {
        if (this.isOn) {
            clearInterval(interval); //stops the setInterval function 
            this.isOn = false;
        }
    };

    this.reset = () => {
        time = 0;
        update();
    };
}





//This is the way to format time with the date object v

// var dateTime = new Date(time);
// dateTime.setHours(dateTime.getHours() - 16);
// let hours = dateTime.getHours().toString();
// let minutes = dateTime.getMinutes().toString();
// let seconds = dateTime.getSeconds().toString();
// let milliseconds = dateTime.getMilliseconds().toString();

// hours.length < 2 ? hours = '0' + hours : null;
// minutes.length < 2 ? minutes = '0' + minutes : null;
// seconds.length < 2 ? seconds = '0' + seconds : null;

// while (milliseconds.length < 3) {
//     milliseconds = `0${milliseconds}`;
// }

// milliseconds = milliseconds.slice(0, -1);

// return (`${hours} : ${minutes} : ${seconds} : ${milliseconds}`);