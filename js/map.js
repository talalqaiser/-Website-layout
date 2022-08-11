function initMap() {
    // The map, centered at Bjorgundfjord Aalesund
    const center = {lat:62.459391, lng:6.191980};
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: center,
    });
    const contentInfo ='<div class="infowrapper text-dark">'+
    '<p>Rent this boat</p>'+
    '<ul><li><a href="renting.html">Start Renting</a></li></ul>'+
    '</div>';
    const infoWindow = new google.maps.InfoWindow({
        content: contentInfo,
    });

    //Add marker for every charging station
    const markers = locations.map((location, i)=>{
        addMarker(location);
    });
    const iconbase = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png';
    // Create markers.
    function addMarker(coords){
        const marker = new google.maps.Marker({
            position: coords,
            icon: {
                url: 'https://www.svgrepo.com/show/51389/boat.svg',
                size: new google.maps.Size(50, 50),
                scaledSize: new google.maps.Size(50, 50),
            },
            map:map,
        });
        marker.addListener("click", () => {
            infoWindow.open({
                anchor: marker,
                map: map,
                shouldFocus: false,
            })
        });
    }

}

/**
 * Location of the charging stations
 * Picked at random locations with higher population density
 * */
const locations = [
    {lat:62.468826, lng:6.131194},
    {lat:62.460776, lng:6.328106},
    {lat:62.444589, lng:6.191019},
    {lat:62.466370, lng:6.115379},
    {lat:62.470852,lng:6.222714}
];
 

/**const app is heavily inspired from https://www.youtube.com/watch?v=nGVoHEZojiQ 
 * TODO change the layout. 
 * Layout is acting strange, does not follo the stylemap.css
*/
const Weatherapp = {
    init: () =>{
        let lat = '62.468826';
        let lon = '6.131194';
        let key = '82e68d18b9c4d57729d243c4f0ed942a';
        let lang = 'en';
        let units = 'metric';
        let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;

        fetch(url)
        .then(resp =>{
            if(!resp.ok) throw new Error(resp.statusText);
            return resp.json();
        })
        .then(data=>{
            Weatherapp.showWeather(data);
        })
        .catch(console.err);
    },
    showWeather: (resp) =>{
        console.log(resp);
        let row = document.querySelector('.weather');
        row.innerHTML = resp.daily.map((day,idx) => {
            if(idx == 0){
                let dt = new Date(day.dt * 1000); //timestamp * 1000
                let sr = new Date(day.sunrise * 1000).toTimeString();
                let ss = new Date(day.sunset * 1000).toTimeString();
                return `<div class="col bg-dark">
                            <div class="card bg-secondary">
                                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" text-light
                                class="card-img-top"
                                alt="${day.weather[0].description}"/>
                                <div class="card-body bg-secondary text-light">
                                    <h3 class="card-title">${day.weather[0].main}</h3>
                                    <p class="card-text">Max ${day.temp.max}&deg;C</p>
                                    <p class="card-text">Min ${day.temp.min}&deg;C</p>
                                    <p class="card-text">Wind ${day.wind_speed}m/s</p>
                                </div>
                            </div>
                        </div>`;
            }
        }).join('');
    }
}
Weatherapp.init(); 

