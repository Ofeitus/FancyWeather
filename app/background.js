const setBackButton = document.querySelector(".refresh-back");

async function setBackground() {
    let today = new Date(),
        hour = today.getHours();
        month = today.getMonth();
    let query;

    if (month >= 12 && month < 3) {
        query = "winter ";
    } else if (month >= 3 && month < 6) {
        query = "spring ";
    } else if (month >= 6 && month < 9) {
        query = "summer ";
    } else {
        query = "autumn ";
    }

    if (hour >= 5 && hour < 12) {
        query += "morning ";
    } else if (hour >= 12 && hour < 16) {
        query += "afternoon ";
    } else if (hour >= 16 && hour < 24) {
        query += "evening ";
    } else {
        query += "night ";
    }

    query += "nature";

    console.log(query);

    const url = "https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query="+query+"&client_id=lS_gB0i60mrX29hoyyA89mBlK5oogLY-Fy2pw4cFFco";
    const res = await fetch(url);
    const data = await res.json();
  
    document.body.style.backgroundImage = "url('" + data.urls.regular + "')";
}

setBackButton.addEventListener("click", setBackground);
setBackground();