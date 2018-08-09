const timer = document.getElementById('timer');
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const rest = document.getElementById('rest');
const end = document.getElementById('end');

var watch = new Stopwatch(timer);
var rester = new Stopwatch(rest);

start.addEventListener('click', () => {
    if (watch.isOn) {
        watch.stop();
        rester.start();
        start.textContent = "Work";
        timer.classList.remove('turnGreen');
        timer.classList.add('turnGrey');
        timer.style.color = "rgb(60, 102, 52)";
        timer.style.transform = "scale(.85)";
        rest.style.color = "rgba(0, 0, 0)";
        rest.style.transform = "scale(1)";

    } else {
        watch.start();
        rester.stop();
        start.textContent = "Break";
        timer.classList.add('turnGreen');
        timer.classList.remove('turnGrey');
        timer.style.color = "rgb(13, 104, 21)";
        timer.style.transform = "scale(1)";
        rest.style.color = "rgba(120, 120, 120)";
        rest.style.transform = "scale(.85)";

    }
});

reset.addEventListener('click', () => {
    watch.reset();
    rester.reset();
});

end.addEventListener('click', () => {
    watch.stop();
    rester.stop();
    totalTime = watch.returnTime() + rester.returnTime();
    formattedTotalTime = watch.returnFormatter(totalTime);
    console.log(formattedTotalTime);
});