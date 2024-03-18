let iterator = 0

let buttonNo = document.querySelector('.content__main__buttons__button#no')
let buttonYes = document.querySelector('.content__main__buttons__button#yes')
let buttonReady = document.querySelector('.content__main__buttons__button#ready')

let bdImage = new Image()
bdImage.src = 'img/background-party.jpg'

let imageSusDog = new Image()
imageSusDog.src = 'img/sus-dog.png'
imageSusDog.style.height = '200px'

let imageHamster = new Image()
imageHamster.src = 'img/hamster.png'
imageHamster.style.height = '200px'

let imagePepeHappy = new Image()
imagePepeHappy.src = 'img/happy-cat.gif'
imagePepeHappy.style.height = '200px'

let sideEyeSound = new Audio('audio/side-eye.mp3')
sideEyeSound.autoplay = false
sideEyeSound.loop = false
sideEyeSound.volume = 0.5

let sadHamsterSound = new Audio('audio/sad-hamster.mp3')
sadHamsterSound.autoplay = false
sadHamsterSound.loop = true
sadHamsterSound.volume = 0.5

let happyCatSound = new Audio('audio/happy-happy-happy-cat.mp3')
happyCatSound.autoplay = false
happyCatSound.loop = true
happyCatSound.volume = 0.5

buttonReady.addEventListener('click', (event) => {
    document.querySelector('.content__header__subtitle_ready').remove()
    document.querySelector('.content__main__buttons_ready').remove()

    document.querySelector('.content__main__buttons').style.display = 'flex'
    document.querySelector('.content__header__subtitle').style.display = 'block'
    document.querySelector('.content__main__info').style.display = 'block'
})

buttonNo.addEventListener('mouseover', (event) => {
    iterator++
    document.body.appendChild(buttonNo)
    buttonNo.style.position = 'absolute'

    let totalWidth = buttonNo.offsetWidth
    let totalHeight = buttonNo.offsetHeight

    let maxHeight = document.body.clientHeight - totalHeight
    let maxWidth = document.body.clientWidth - totalWidth

    let newPosition = {
        top: Math.random() * maxHeight,
        left: Math.random() * maxWidth
    }

    while (newPosition.top < 0 || newPosition.left < 0 || newPosition.top > maxHeight || newPosition.left > maxWidth || (newPosition.top > event.clientY && newPosition.top < event.clientY + totalHeight && newPosition.left > event.clientX && newPosition.left < event.clientX + totalWidth)) {
        newPosition = {
            top: Math.random() * maxHeight,
            left: Math.random() * maxWidth
        }
    }

    buttonNo.style.top = newPosition.top + 'px'
    buttonNo.style.left = newPosition.left + 'px'

    let textContainer = document.querySelector('.content__main__info')

    let text = document.querySelector('.content__main__info__text')

    if (text.innerHTML !== 'Czy aby na pewno?' && iterator < 5) {
        text.innerHTML = 'Czy aby na pewno?'
        textContainer.appendChild(imageSusDog)
        sideEyeSound.play()
    }

    if (iterator === 5) {
        sideEyeSound.pause()
        text.innerHTML = 'No to chyba sobie pogadamy...'
        textContainer.lastChild.remove()
        textContainer.appendChild(imageHamster)
        sadHamsterSound.play()
    }

    if (text.innerHTML === 'Czy aby na pewno?') {
        sideEyeSound.play()
    }
})



buttonYes.addEventListener('click', (event) => {
    sideEyeSound.pause()
    sadHamsterSound.pause()
    happyCatSound.play()
    let textContainer = document.querySelector('.content__main__info')
    let header = document.querySelector('.content__header__title')

    document.querySelector('.content__main__info__text').remove()
    document.querySelector('.content__header__subtitle').remove()
    document.querySelector('.content__main__buttons').remove()

    header.innerHTML = 'Tak! Szczęśliwej rocznicy!'
    if (textContainer.lastChild.tagName === 'IMG') textContainer.lastChild.remove()
    textContainer.appendChild(imagePepeHappy)

    if (buttonNo) buttonNo.remove()

    document.body.style.backgroundImage = `url(${bdImage.src})`

    animate()
    sendNotification()
})

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")
const leaves = []
const numLeaves = 100

document.body.appendChild(canvas)

canvas.width = window.innerWidth
canvas.height = window.innerHeight

function createLeaf() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * 18 + 2,
        size: Math.random() * 22 + 3,
        speed: Math.random() * 3 + 1,
        color: `rgba(${Math.random() * 200 + 50}, ${Math.random() * 200 + 50}, ${Math.random() * 200 + 50}, ${Math.random() * 0.8 + 0.2})`,
        rotation: Math.random() * 360
    }
}

function createLeaves() {
    for (let i = 0; i < numLeaves; i++) {
        leaves.push(createLeaf())
    }
}

function updateLeaves() {
    for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i]
        leaf.y += leaf.speed
        leaf.x += 1.0 * Math.sin(leaf.y / leaf.size)

        if (leaf.y > canvas.height) {
            leaf.y = -20
            leaf.x = Math.random() * canvas.width
        }
    }
}

function drawLeaves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i]

        ctx.save()
        ctx.translate(leaf.x + leaf.size / 2, leaf.y + leaf.size / 2)
        ctx.rotate((leaf.rotation * Math.PI) / 180)
        ctx.fillStyle = leaf.color
        ctx.fillRect(-leaf.size / 2, -leaf.size / 2, leaf.size, leaf.size)

        ctx.restore()
    }
}

function animate() {
    updateLeaves()
    drawLeaves()
    requestAnimationFrame(animate)
}

function onWindowResize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

window.addEventListener("resize", onWindowResize)

createLeaves()

function sendNotification() {
    const webhookUrl = 'https://discord.com/api/webhooks/1214730681964564582/COMhPep17-QUhWmebOzxXgHmsI6Cfsm6kjvIaKdQkWiz80Rcy4Nnxm0gzhUoQQNzFgRO'
    const data = {
        embeds: [
            {
                title: 'Powiadomienie',
                description: 'Kliknięto przycisk "tak" :heart:',
                color: 16711680
            }
        ],
        content: '<@308225074014453761>',
        allowed_mentions: {
            users: ['308225074014453761']
        }
    }
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}