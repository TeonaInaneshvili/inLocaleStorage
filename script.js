async function boardGames() {
    try {
        const response = await fetch("https://6642ea053c01a059ea20c70a.mockapi.io/boardGames")
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        let boardGames = await response.json()
        for (let boardGame of boardGames) {
            let card = createboardGamecard(boardGame)
            document.querySelector('.container').appendChild(card)

        }
    }
    catch (error) {
        console.error(error)
    }

}

function createboardGamecard(boardGame) {
    let card = document.createElement("div")
    card.className = 'card'


    const header = document.createElement('div')


    let btn = document.createElement("BUTTON");
    let t = document.createTextNode("Save in local storage");
    btn.className = 'btn'
    btn.appendChild(t);
    header.appendChild(btn)
    btn.addEventListener('click', ()=> {
        const DataJson = JSON.stringify(boardGame)
        localStorage.setItem('info', DataJson)
        showcard("info")
    })



    const content = document.createElement('div')
    content.className = 'card-content'

    const img = document.createElement('img');
    img.src = boardGame.imageUrl;
    
    const gName = document.createElement('h2')
    gName.textContent = boardGame.boardGameName

    const minPlayer = document.createElement('p')
    minPlayer.textContent = `Min. num of Players: ${boardGame.minPlayer}`

    const maxPlayer = document.createElement('p')
    maxPlayer.textContent = `Max. num of Players: ${boardGame.maxPlayer}`
    
    const playersAge = document.createElement('p')
    playersAge.textContent = `player's age from: ${boardGame.playersAge}`

    const price = document.createElement('p')
    price.textContent = `price in Gel: ${boardGame.price}`




    content.appendChild(header)
    content.appendChild(gName)
    content.appendChild(minPlayer)
    content.appendChild(maxPlayer)
    content.appendChild(playersAge)
    content.appendChild(price)
    card.appendChild(img)
    card.appendChild(content)
    return card

}


function showcard(information){
   const data = localStorage.getItem(information);
   if(data){
    const result = JSON.parse(data)
    console.log(result.boardGameName +' saved in local storage')
    alert(result.boardGameName + ' saved in local storage')
   }else{
    console.log('error')
   }
}

boardGames()
