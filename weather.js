const COORDS_LS = 'coords'

function handleGeoSuccess(position) {

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

    }
}

function init() {
    loadCoords()
}

init()