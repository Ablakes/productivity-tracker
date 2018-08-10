const UIController = (function () {

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

    let workTime = new Stopwatch(workClock);
    let breakClock = new Stopwatch(rest);
    let data = [];

    let formattedDate;

    restAddTime.addEventListener('click', () => {
        breakClock.addTime();
    });
    workAddTime.addEventListener('click', () => {
        workTime.addTime();
    });
    restSubtractTime.addEventListener('click', () => {
        breakClock.subtractTime();
    });
    workSubtractTime.addEventListener('click', () => {
        workTime.subtractTime();
    });

    start.addEventListener('click', () => {
        if (workTime.isOn) {
            workTime.stop();
            breakClock.start();
            start.textContent = "Work";
            animateworkClockOn();
            animateBreakClockOff();

        } else {
            workTime.start();
            breakClock.stop();
            start.textContent = "Break";
            animateworkClockOff();
            animateBreakClockOn();

        }
    });

    end.addEventListener('click', () => {
        workTime.stop();
        breakClock.stop();
        pushToDateRecord();
        pushToWorkRecord();
        pushToBreakRecord();
        pushToTotalRecord();
        workTime.reset();
        breakClock.reset();
        start.textContent = "Work";
    });

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

    const animateBreakClockOn = () => {
        rest.style.color = "rgba(120, 120, 120)";
        rest.style.transform = "scale(.85)";
    }

    const animateBreakClockOff = () => {
        rest.style.color = "rgba(0, 0, 0)";
        rest.style.transform = "scale(1)";
    }

    const postDataItem = (item, list, className) => {
        const li = document.createElement('li');
        li.className = 'record__column-item';
        li.appendChild(document.createTextNode(item));
        list.appendChild(li);
        li.classList.add(className);
    }

    const loadData = () => {

        //re-populate data from localStorage
        Object.keys(localStorage).forEach((item) => {
            data.push(JSON.parse(localStorage.getItem(item)));
        });

        // re-post data to records
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
        const month = date.getMonth();
        const day = date.getDate();
        formattedDate = `${month}/${day}`;

        postDataItem(formattedDate, dateList);

        //Push to data
        data.push([]);
        data[data.length - 1].push(formattedDate);
    }

    const pushToWorkRecord = () => {
        const time = workTime.returnTime();
        const formattedWorkTime = recordFormatter(time);

        postDataItem(formattedWorkTime, workList, 'green');

        //push to data
        data[data.length - 1].push(formattedWorkTime);
    }

    const pushToBreakRecord = () => {
        const restTime = breakClock.returnTime();
        const formattedRestTime = recordFormatter(restTime);

        postDataItem(formattedRestTime, restList, 'red');

        //push to data
        data[data.length - 1].push(formattedRestTime);
    }

    const pushToTotalRecord = () => {

        const totalTime = workTime.returnTime() + breakClock.returnTime();
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

})();