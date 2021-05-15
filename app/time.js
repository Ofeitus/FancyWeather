const date_time = document.querySelector('#date-time');

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    let time = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    let dayofweek = new Date().toLocaleString("en", {weekday: 'short'});
    let day = new Date().toLocaleString("en", {day: 'numeric'});
    let month = new Date().toLocaleString("en", {month: 'long'});

    date_time.innerHTML = dayofweek +" "+ day +" "+ month +" "+ time;
}

showTime();
setInterval(showTime, 1000);