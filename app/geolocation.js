const latitude = document.querySelector("#latitude-value");
const longitude = document.querySelector("#longitude-value");
const cityInput = document.querySelector("#city-input");
const cityInputButton = document.querySelector(".subscribe-button");

function getMap(coords) {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2lzbG9yb2QiLCJhIjoiY2tvcHhsbDVwMHBzeTJ2c2o1djVzODY3eSJ9.S2bQVUWkOds89dtJzU-12Q';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [coords[1], coords[0]],
        zoom: 9
    });
}

async function getLocation() {
    const url = "https://api.opencagedata.com/geocode/v1/json?q="+cityInput.value+"&key=64eb823c97664e6886baf3b0c9d945b7&pretty=1&no_annotations=1";
    const res = await fetch(url);
    const data = await res.json();

    let coords = [data.results[0].geometry.lat, data.results[0].geometry.lng];

    latitude.innerHTML = Math.trunc(coords[0]) + "°" + coords[0].toString().split(".")[1].slice(0, 2) + "'";
    longitude.innerHTML= Math.trunc(coords[1]) + "°" + coords[1].toString().split(".")[1].slice(0, 2) + "'";
    
    getMap(coords);
}

async function getMyLocation() {
    const url = "http://ipinfo.io/46.53.253.241?token=74a0efcb8235f4";
    const res = await fetch(url);
    const data = await res.json();
  
    let coords = data.loc.split(",");
    latitude.innerHTML = Math.trunc(coords[0]) + "°" + coords[0].split(".")[1].slice(0, 2) + "'";
    longitude.innerHTML= Math.trunc(coords[1]) + "°" + coords[1].split(".")[1].slice(0, 2) + "'";

    getMap(coords);
}

cityInputButton.addEventListener("click", getLocation);
getMyLocation();