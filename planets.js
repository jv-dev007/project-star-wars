let currentPageUrl = 'https://swapi.dev/api/planets/';

window.onload = async () => {
    try {
        await loadCharacters(currentPageUrl)

        const backButton = document.getElementById('back-button')
        backButton.addEventListener('click', previousPage)

        const nextButton = document.getElementById('next-button')
        nextButton.addEventListener('click', nextPage)
    } catch (error) {
        console.log(error, 'erro ao carregar cards')
    }
}

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = '';

    try {
        const response = await fetch(url)
        const responseJson = await response.json()

        responseJson.results.forEach(planet => {
            const card = document.createElement("div")
            card.className = "cards"

            const planetImage = document.createElement("img")
            planetImage.className = "planet-img"
            planetImage.style.backgroundImage =
            `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg')`
            
            const planetNameBG = document.createElement("div")
            planetNameBG.className = "planet-name-bg"

            const planetName = document.createElement("span")
            planetName.className = "planet-name"
            planetName.innerText = `${planet.name}`

            card.onclick = () => {
                const modal = document.getElementById('modal')
                modal.style.visibility = 'visible'

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = ''

                const backImage = document.createElement("div")
                backImage.className = 'background-image'

                const planetImageModal = document.createElement("div")
                planetImageModal.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg')`
                planetImageModal.className = 'planet-image-modal'



                const name = document.createElement("span")
                name.className = "planet-details"
                name.innerText = `nome: ${planet.name}`

                const rotationPeriod = document.createElement("span")
                rotationPeriod.className = 'planet-details'
                rotationPeriod.innerText = `periodo rotacional: ${planet.rotation_period} dias`

                const orbitalPeriod = document.createElement("span")
                orbitalPeriod.className = 'planet-details'
                orbitalPeriod.innerText = `periodo orbital: ${planet.orbital_period} anos`

                const diameter = document.createElement("span")
                diameter.className = 'planet-details'
                diameter.innerText = `diametro: ${planet.diameter} km`

                const climate = document.createElement("span")
                climate.className = 'planet-details'
                climate.innerText = `clima: ${planet.climate}`

                const terrain = document.createElement("span")
                terrain.className = 'planet-details'
                terrain.innerText = `terreno: ${planet.terrain}`

                const population = document.createElement("span")
                population.className = 'planet-details'
                population.innerText = `populacao: ${planet.population}`

                backImage.appendChild(planetImageModal)
                modalContent.appendChild(backImage)
                modalContent.appendChild(name)
                modalContent.appendChild(rotationPeriod)
                modalContent.appendChild(orbitalPeriod)
                modalContent.appendChild(diameter)
                modalContent.appendChild(climate)
                modalContent.appendChild(terrain)
                modalContent.appendChild(population)
                modal.appendChild(modalContent)
            }

            card.appendChild(planetImage)
            planetNameBG.appendChild(planetName)
            card.appendChild(planetNameBG)
            mainContent.appendChild(card)
        });

        const backButton = document.getElementById('back-button')
        const nextButton = document.getElementById('next-button')

        backButton.disabled = !responseJson
        nextButton.disabled = !responseJson

        backButton.style.visibility = responseJson.previous ? 'visible' : 'hidden'

        currentPageUrl = url

    } catch (error) {
        console.log('erro ao criar card');
    }
}

async function nextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)
    } catch (error) {
        console.log('erro ao carregar proxima pagina');
    }
} 

async function previousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)
    } catch (error) {
        console.log('erro ao carregar proxima pagina');
    }
} 

function hideModal() {
    const modal = document.getElementById('modal')
    modal.style.visibility = 'hidden'
}