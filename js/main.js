const UIController = (function () {

    const timer = document.getElementById('timer');
    const start = document.getElementById('start');
    const rest = document.getElementById('rest');
    const end = document.getElementById('end');
    const workList = document.querySelector(".record__column-heading--work");
    const restList = document.querySelector(".record__column-heading--rest");
    const totalList = document.querySelector(".record__column-heading--total");
    const restAddTime = document.getElementById('btn-rest-add-time');
    const workAddTime = document.getElementById('btn-work-add-time');
    const restSubtractTime = document.getElementById('btn-rest-subtract-time');
    const workSubtractTime = document.getElementById('btn-work-subtract-time');

    let workClock = new Stopwatch(timer);
    let breakClock = new Stopwatch(rest);

    restAddTime.addEventListener('click', () => {
        breakClock.addTime();
    });
    workAddTime.addEventListener('click', () => {
        workClock.addTime();
    });
    restSubtractTime.addEventListener('click', () => {
        breakClock.subtractTime();
    });
    workSubtractTime.addEventListener('click', () => {
        workClock.subtractTime();
    });

    start.addEventListener('click', () => {
        if (workClock.isOn) {
            workClock.stop();
            breakClock.start();
            start.textContent = "Work";
            timer.classList.remove('turnGreen');
            timer.classList.add('turnGrey');
            timer.style.color = "rgb(60, 102, 52)";
            timer.style.transform = "scale(.85)";
            rest.style.color = "rgba(0, 0, 0)";
            rest.style.transform = "scale(1)";

        } else {
            workClock.start();
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

    const updateworkClock = () => {
        const li = document.createElement('li');
        const time = workClock.returnTime();
        const formattedworkClock = recordFormatter(time);
        li.appendChild(document.createTextNode(formattedworkClock));
        li.className = "record__column-item";
        li.classList.add('green');
        workList.appendChild(li);
    }

    const updateRestTime = () => {
        const li = document.createElement('li');
        const restTime = breakClock.returnTime();
        const formattedRestTime = recordFormatter(restTime);
        li.className = "record__column-item";
        li.classList.add('red');
        li.appendChild(document.createTextNode(formattedRestTime));
        restList.appendChild(li);

    }

    const updateTotalTime = () => {
        const li = document.createElement('li');
        const totalTime = workClock.returnTime() + breakClock.returnTime();
        const formattedTotalTime = recordFormatter(totalTime);
        li.appendChild(document.createTextNode(formattedTotalTime));
        li.className = "record__column-item";
        totalList.appendChild(li);

    }

    end.addEventListener('click', () => {
        workClock.stop();
        breakClock.stop();
        updateworkClock();
        updateRestTime();
        updateTotalTime();
        workClock.reset();
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