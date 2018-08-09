const UIController = (function () {

    const timer = document.getElementById('timer');
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

    let workTime = new Stopwatch(timer);
    let breakClock = new Stopwatch(rest);

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
            timer.classList.remove('turnGreen');
            timer.classList.add('turnGrey');
            timer.style.color = "rgb(60, 102, 52)";
            timer.style.transform = "scale(.85)";
            rest.style.color = "rgba(0, 0, 0)";
            rest.style.transform = "scale(1)";

        } else {
            workTime.start();
            breakClock.stop();
            start.textContent = "Break";
            timer.classList.add('turnGreen');
            timer.classList.remove('turnGrey');
            timer.style.color = "rgb(13, 104, 21)";
            timer.style.transform = "scale(1)";
            rest.style.color = "rgba(120, 120, 120)";
            rest.style.transform = "scale(.85)";

        }
    });

    const data = {};

    const pushToDateRecord = () => {

        //Add to record list
        const date = new Date();
        const month = date.getMonth();
        const day = date.getDate();
        formattedDate = `${month}/${day}`;
        const li = document.createElement('li');
        li.className = 'record__column-item';
        li.appendChild(document.createTextNode(formattedDate));
        dateList.appendChild(li);

        //Push to data
        formattedDate = formattedDate;
        data[formattedDate] = [];
        return formattedDate;
    }

    const pushToWorkRecord = () => {
        const li = document.createElement('li');
        const time = workTime.returnTime();
        const formattedWorkTime = recordFormatter(time);
        li.appendChild(document.createTextNode(formattedWorkTime));
        li.className = "record__column-item";
        li.classList.add('green');
        workList.appendChild(li);

        //push to data
        data[formattedDate].push(formattedWorkTime);
    }

    const pushToBreakRecord = () => {
        const li = document.createElement('li');
        const restTime = breakClock.returnTime();
        const formattedRestTime = recordFormatter(restTime);
        li.className = "record__column-item";
        li.classList.add('red');
        li.appendChild(document.createTextNode(formattedRestTime));
        restList.appendChild(li);

        //push to data
        data[formattedDate].push(formattedRestTime);
    }

    const pushToTotalRecord = () => {
        const li = document.createElement('li');
        const totalTime = workTime.returnTime() + breakClock.returnTime();
        const formattedTotalTime = recordFormatter(totalTime);
        li.appendChild(document.createTextNode(formattedTotalTime));
        li.className = "record__column-item";
        totalList.appendChild(li);

        //push data to local storage
        data[formattedDate].push(formattedTotalTime);
        const dateRecord = Object.keys(data)[0];
        const timeRecord = JSON.stringify(data[dateRecord]);
        localStorage.setItem(dateRecord, timeRecord);
    }

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


    const recordFormatter = (time) => {
        var minutes = parseInt((time / (1000 * 60)) % 60),
            hours = parseInt((time / (1000 * 60 * 60)) % 24);
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        return hours + ":" + minutes;
    }

})();