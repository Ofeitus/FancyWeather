const setBackButton = document.querySelector(".refresh-back");

async function setBackground() {
    console.log(1); 
    const url = "https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=lS_gB0i60mrX29hoyyA89mBlK5oogLY-Fy2pw4cFFco";
    const res = await fetch(url);
    const data = await res.json();
  
    document.body.style.backgroundImage = "url('" + data.urls.regular + "')";
}

setBackButton.addEventListener("click", setBackground);
setBackground();