const body = document.querySelector('body')

const IMG_COUNT = 7

function paintImage(imageNumber) {
    const image = new Image()
    image.src = `images/${imageNumber}.jpg`
    image.classList.add('bgImage')
    body.appendChild(image)
}

function getRandom() {
    const number = Math.ceil(Math.random() * IMG_COUNT)
    return number;
}

function init() {
    const randomNumber = getRandom()
    paintImage(randomNumber)
}

init()