const date_time = document.querySelector('#date-time');
var timezone = 0;
var locale = "en";

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function showTime() {
    let today = new Date();
    today.setTime(today.getTime() + (today.getTimezoneOffset()*60 + timezone)*1000);

    let hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    let time = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    let dayofweek = today.toLocaleString("en", {weekday: 'short'});
    let day = today.toLocaleString("en", {day: 'numeric'});
    let month = today.toLocaleString("en", {month: 'long'});

    date_time.innerHTML = dayofweek +" "+ day +" "+ month +" "+ time;

    for (let i = 1; i <= 3; i++) {
        today.setTime(today.getTime() + 24*3600*1000);
        let week_day = document.querySelector("#day"+i);
        week_day.innerHTML = today.toLocaleString("en", {weekday: 'long'});
    }
}

showTime();
setInterval(showTime, 1000);