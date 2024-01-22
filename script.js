/*input_ api 
window.onload chamar a função para executar a função loadCharacters toda vez que a pagina for iniciada ou reiniciada 
try executar loadCharacters e try enviar a url para a função como argumento
toda vez que a função loadCharacters for chamada, ela vai esperar receber a url da api

2-
antes de carregar esses caracteres, a função loadCharacters vai limpar a div main-content para que quando eu atualize a pagina, os cards anteriores saiam de tela

try criar caracteres
input _ fazer uma requisição e armazenar os dados
input _ esperar requisição e transformar em JSON 
loop x a y 
input card criar uma div
criar os cards com js
input div card
 alteramos dinamicamente o id da url da imagem usando uma regexp para que a imagem corresponda a cada card de personagem
input div bg-character-name
input span name-character alterar dinamicamente o nome usando os dados da api
colocar span dentro da div bg-character-name 
bg-character name dentro da div card
div card dentro da div maincontent
reatribuir o valor currentpageurl

3- botoes next e back
funcao onload
input botao next, evento de click, call loadnext
input botao back, evento de click, call loadprevious

funcao loadcharacters
input botao next
input botao back
manipular o disabled
negar o response para qunado houver um next ou back, habilitar o botao e quando nao houver, desabiltar o botao
if visibility botao
input nextpage
if api negada, return
try requisição url.next 
transform json
loadcharacters(url.next)
input previouspage
if api negada, return
try requisição url.previous
transform json
call loadcharacters(url.previous)
modal
ao clicar no card, mostraremos o modal, e ao clicar fora do card escondemos o modal
1- hidemodal()
input id modal
style hidden
2- card.onclick 
arrow function
modal id 
style visible

*/


let currentPageUrl = 'https://swapi.dev/api/people/'

window.onload = async () => {
    try {
       await loadCharacters(currentPageUrl)
    } catch (error) {
        console.log('erro ao carregar cards')
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
}

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; 

    try {
        const response = await fetch(url)
        const responseJson = await response.json()

        responseJson.results.forEach(character => {
            const card = document.createElement("div")
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg"

            const characterName = document.createElement("span")
            characterName.className = "character-name"
            characterName.innerText = `${character.name}`

            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
                characterImage.className = "character-image"

                const name = document.createElement("span")
                name.className = "character-details"
                name.innerText = `Nome: ${character.name}`

                const characterHeight = document.createElement("span")
                characterHeight.className = "character-details"
                characterHeight.innerText = `Altura: ${convertHeight(character.height)}`

                const mass = document.createElement("span")
                mass.className = "character-details"
                mass.innerText = `Peso: ${convertMass(character.mass)}`

                const eyeColor = document.createElement("span")
                eyeColor.className = "character-details"
                eyeColor.innerText = `Cor dos olhos: ${convertEyeColor(character.eye_color)}`
                

                const birthYear = document.createElement("span")
                birthYear.className = "character-details"
                birthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(characterHeight)
                modalContent.appendChild(mass)
                modalContent.appendChild(eyeColor)
                modalContent.appendChild(birthYear)
            }

            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next  
        backButton.disabled = !responseJson.previous
        
        backButton.style.visibility = responseJson.previous? "visible" : "hidden"

        currentPageUrl = url

    } catch {
        console.log('erro ao carregar personagens');
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar a proxima pagina')
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar a pagina anterior')
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertEyeColor(eyeColor) {
    const cores = {
        blue: "azul",
        brown: "castanho",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelho",
        orange: "laranja",
        hazel: "avela",
        unknown: "desconhecida"
    }

    return cores[eyeColor.toLowerCase()] || eyeColor
}

function convertHeight(height) {
    if (height === "unknown") {
        return "desconhecida"
    }

    return (height / 100).toFixed(2)
}

function convertMass(mass) {
    if (mass === "unknown") {
        return "desconhecida"
    }

    return `${mass} kg`
}

function convertBirthYear(birthYear) {
    if (birthYear === "unknown") {
        return "desconhecida"
    }

    return birthYear
}