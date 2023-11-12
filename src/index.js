const url = 'http://localhost:3000/pups'
const dogBar = document.getElementById('dog-bar')
let dogList = []

fetch(url)
.then(res => res.json())
.then(dog => {
    dogList = dog
    renderDogName(dogList)
})

function renderDogName(dog){
    dog.forEach(addDogNameToBar)
}

function addDogNameToBar(dog){
    const name = document.createElement('span')
    name.textContent = dog.name
    dogBar.append(name)

    name.addEventListener('click', () => fetchDogInfo(dog.id))
}

function fetchDogInfo(id){
    fetch(`${url}/${id}`)
    .then(res => res.json())
    .then(data => displayOneDog(data))
}

function displayOneDog(dog){

    const dogDisplayBar = document.getElementById('dog-info')
    const div = document.createElement('div')

    dogDisplayBar.innerHTML = `
    <img src=${dog.image} />
    <h2>${dog.name}</h2>
    <button id='button'>${dog.isGoodDog} Dog!</button>
    `
    console.log(div)

    const button = document.getElementById('button')
    if (button.textContent === 'true') {
        button.textContent = 'Good Dog!'
    } else {
        button.textContent = 'Bad Dog!'
    }

        button.addEventListener('click', () => {
            if (button.textContent === 'Good Dog!') {
                button.textContent = 'Bad Dog!'
            } else if (button.textContent === 'Bad Dog!') {
                    button.textContent = 'Good Dog!'
                
            }
            sendPatch(dog)
        })
}

function sendPatch(dog){
    const isGoodDog = button.textContent === 'Good Dog!'
    console.log(`${dog.isGoodDog}`)
    fetch(`${url}/${dog.id}`, {
        method: 'PATCH',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            isGoodDog: isGoodDog
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
}