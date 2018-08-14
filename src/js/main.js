import Stopwatch from './stopwatch';


const workClock = document.getElementById('work-clock');
const start = document.getElementById('start');
const rest = document.getElementById('rest');
const end = document.getElementById('end');
const workList = document.querySelector(".record__column-heading--work");
const restList = document.querySelector(".record__column-heading--rest");
const totalList = document.querySelector(".record__column-heading--total");
const dateList = document.querySelector(".record__column-heading--date");
const restAddTime = document.getElementById('btn-rest-add-time');
const workAddTime = document.getElementById('btn-work-add-time');
const restSubtractTime = document.getElementById('btn-rest-subtract-time');
const workSubtractTime = document.getElementById('btn-work-subtract-time');

let workStopwatch = new Stopwatch(workClock);
let breakStopwatch = new Stopwatch(rest);

let data = [];

let formattedDate;

//BUTTONS TO ADJUST TIME UP/DOWN
restAddTime.addEventListener('click', () => {
    breakStopwatch.addTime();
});
workAddTime.addEventListener('click', () => {
    workStopwatch.addTime();
});
restSubtractTime.addEventListener('click', () => {
    breakStopwatch.subtractTime();
});
workSubtractTime.addEventListener('click', () => {
    workStopwatch.subtractTime();
});

// WORK/BREAK BUTTON
start.addEventListener('click', () => {
    if (workStopwatch.isOn) {
        workStopwatch.stop();
        breakStopwatch.start();
        start.textContent = "Work";
        animateworkClockOn();
        animatebreakStopwatchOff();

    } else {
        workStopwatch.start();
        breakStopwatch.stop();
        start.textContent = "Break";
        animateworkClockOff();
        animatebreakStopwatchOn();

    }
});

//END WORKDAY BUTTON
end.addEventListener('click', () => {
    workStopwatch.stop();
    breakStopwatch.stop();
    pushToDateRecord();
    pushToWorkRecord();
    pushToBreakRecord();
    pushToTotalRecord();
    workStopwatch.reset();
    breakStopwatch.reset();
    start.textContent = "Work";
});

const postDataItem = (item, list, className) => {
    const li = document.createElement('li');
    li.className = 'record__column-item';
    li.appendChild(document.createTextNode(item));
    list.appendChild(li);
    li.classList.add(className);
}

const loadData = () => {
    console.log("this 2?");

    //RE-POPULATE DATA FROM LOCAL STORAGE
    Object.keys(localStorage).forEach((item) => {
        data.push(JSON.parse(localStorage.getItem(item)));
    });

    // RE-POST DATA FROM RECORDS
    data.forEach((item) => {
        postDataItem(item[0], dateList);
        postDataItem(item[1], workList, 'green');
        postDataItem(item[2], restList, 'red');
        postDataItem(item[3], totalList);
    })
};

loadData();

const pushToDateRecord = () => {

    //Add to record list
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    formattedDate = `${month}/${day}`;

    postDataItem(formattedDate, dateList);

    //Push to data
    data.push([]);
    data[data.length - 1].push(formattedDate);
}

const pushToWorkRecord = () => {
    const time = workStopwatch.returnTime();
    const formattedworkStopwatch = recordFormatter(time);

    postDataItem(formattedworkStopwatch, workList, 'green');

    //push to data
    data[data.length - 1].push(formattedworkStopwatch);
}

const pushToBreakRecord = () => {
    const restTime = breakStopwatch.returnTime();
    const formattedRestTime = recordFormatter(restTime);

    postDataItem(formattedRestTime, restList, 'red');

    //push to data
    data[data.length - 1].push(formattedRestTime);
}

const pushToTotalRecord = () => {

    const totalTime = workStopwatch.returnTime() + breakStopwatch.returnTime();
    const formattedTotalTime = recordFormatter(totalTime);

    postDataItem(formattedTotalTime, totalList);

    //push data to data
    data[data.length - 1].push(formattedTotalTime);

    //push to local storage
    let storageKey = (data.length - 1).toString();
    let storageArr = JSON.stringify(data[storageKey]);
    localStorage.setItem(storageKey, storageArr)
}

const recordFormatter = (time) => {
    var minutes = parseInt((time / (1000 * 60)) % 60),
        hours = parseInt((time / (1000 * 60 * 60)) % 24);
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    return hours + ":" + minutes;
}




// ANIMATIONS
const animateworkClockOn = () => {
    workClock.classList.remove('turnGreen');
    workClock.classList.add('turnGrey');
    workClock.style.color = "rgb(60, 102, 52)";
    workClock.style.transform = "scale(.85)";
}

const animateworkClockOff = () => {
    workClock.classList.add('turnGreen');
    workClock.classList.remove('turnGrey');
    workClock.style.color = "rgb(13, 104, 21)";
    workClock.style.transform = "scale(1)";
}

const animatebreakStopwatchOn = () => {
    rest.style.color = "rgba(120, 120, 120)";
    rest.style.transform = "scale(.85)";
}

const animatebreakStopwatchOff = () => {
    rest.style.color = "rgba(0, 0, 0)";
    rest.style.transform = "scale(1)";
}