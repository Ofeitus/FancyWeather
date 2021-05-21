const map_container = document.querySelector("#map");

function getMap(coords) {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2lzbG9yb2QiLCJhIjoiY2tvcHhsbDVwMHBzeTJ2c2o1djVzODY3eSJ9.S2bQVUWkOds89dtJzU-12Q';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [coords[1], coords[0]],
        zoom: 9
    });

    map.on('click', function(e) {
        getWeather(getWeatherApiUrlByCoords([e.lngLat.lat, e.lngLat.lng]));
        });

    var marker = new mapboxgl.Marker()
        .setLngLat([coords[1], coords[0]])
        .addTo(map);

    document.querySelector(".mapboxgl-ctrl-bottom-right").innerHTML = "";
}

function getMapCoords() {
    console.log(map.transform.center);
}

async function getMyCity() {
    const url = "https://ipinfo.io/json?token=74a0efcb8235f4";
    const res = await fetch(url);
    const data = await res.json();
  
    return data.city;
}