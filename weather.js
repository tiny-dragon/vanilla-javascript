const weather = document.querySelector('.js-weather')

const API_KEY = '8766ff947ed713c276d8e7ea6cd4eeb0'
const COORDS_LS = 'coords'

function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
        return response.json();
    }).then(function(json) {
        const temparature = json.main.temp
        const place = json.name
        weather.innerText = `${temparature} @ ${place}`
    })
}

function saveCoods(coodsObj) {
    localStorage.setItem(COORDS_LS, JSON.stringify(coodsObj))
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coodsObj = {
        latitude,
        longitude
    }

    saveCoods(coodsObj)
    getWeather(latitude, longitude)
}

function handleGeoError(error) {
    console.log('Cant access geo location')
}

function askForCoods() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS_LS)

    if (loadedCoords === null) {
        askForCoods()
    } else {
        const parsedCoords = JSON.parse(loadedCoords)
        getWeather(parsedCoords.latitude, parsedCoords.longitude)
    }
}

function init() {
    loadCoords()
}

init()