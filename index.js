let requestOptions = {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow'
  }


  let requestOptions2 = {
    method: 'POST',
    mode: 'cors',
    redirect: 'follow'
  }

  //This API pulls the top 100 MarketCap cryptocurrencies 
  const base_URL = 'https://api.coincap.io/v2/assets/'
  
  // DOM selectors
  const coinsTable = document.querySelector('.table')
  const featuredCoinName = document.querySelector('#featCoinName')
  const dashTable = document.querySelector('.coinDash')

  // EVENT LISTENERS

  //GET json data from API and parse into objects
//FETCHERS

async function getAllInfo() {
  return fetch(base_URL, requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error:', error))
}

function postData(coinData) {
  fetch (base_URL, {
    method: 'POST',
    header: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(coinData)
  })
  .then (r => r.json())
  .then (data => console.log(data))
}

//Render Functions
function renderAll(allCoinsObj) {
  allCoinsObj.data.forEach(renderCoinList)
}

function renderCoinList(coinObj) {
  const coin = document.createElement('tr')
  const coinName = document.createElement('td')
  const coinSym = document.createElement('td')
  const coinPrice = document.createElement('td')
  const coinMarketCap = document.createElement('td')
  const coinPercent = document.createElement('td')
  const coinFav = document.createElement('td')
  const addFav = document.createElement('button')

  const price = parseFloat(coinObj.priceUsd).toFixed(2)
  const marketPrice = parseFloat(coinObj.marketCapUsd).toFixed(2)
  const changPerc = parseFloat(coinObj.changePercent24Hr).toFixed(2)

  coin.id = `${coinObj.id}`
  coin.className = 'favBtn'
  coinName.innerText = `${coinObj.name}`
  coinSym.innerText = `${coinObj.symbol}`
  coinPrice.innerText =`$${price}`
  coinMarketCap.innerText =`$${marketPrice}`
  coinPercent.innerText =`${changPerc}%`
  addFav.innerText = 'Add to Dash'

  
  coin.addEventListener('click', () => renderCoinDetail(coinObj))
  addFav.addEventListener('click', (e) => handleAddToDash(e, coinObj))
  
  coinFav.appendChild(addFav)
  coin.appendChild(coinName)
  coin.appendChild(coinSym)
  coin.appendChild(coinPrice)
  coin.appendChild(coinMarketCap)
  coin.appendChild(coinPercent)
  coin.appendChild(coinFav)
  coinsTable.appendChild(coin)
}

function renderCoinDetail (coinObj) {
  featuredCoinName.innerText = `${coinObj.name} | ${coinObj.symbol}`
}

// Handlers

function handleAddToDash (e, coinObj) {
  e.stopPropagation();
  const dashCoin = document.createElement('tr')
  const name1 = document.createElement('td')
  const sym1 = document.createElement('td')
  const priceDash = document.createElement('td')
  const percChange = document.createElement('td')

  const coinData = {
    "id": `${coinObj.id}`,
    "rank": `${coinObj.rank}`,
    "symbol": `${coinObj.symbol}`,
    "name": `${coinObj.name}`,
    "supply": `${coinObj.supply}`,
    "maxSupply": `${coinObj.maxSupply}`,
    "marketCapUsd": `${coinObj.marketCapUsd}`,
    "volumeUsd24Hr": `${coinObj.volumeUsd24Hr}`,
    "priceUsd": `${coinObj.priceUsd}`,
    "changePercent24Hr": `${coinObj.changePercent24Hr}`,
    "vwap24Hr": `${coinObj.vwap24Hr}`
  }
  
  

  const newDashPrice = parseFloat(coinObj.priceUsd).toFixed(2)
  const newChangPerc = parseFloat(coinObj.changePercent24Hr).toFixed(2)

  name1.innerText = `${coinObj.name}`
  sym1.innerText = `${coinObj.symbol}`
  priceDash.innerText =`$${newDashPrice}`
  percChange.innerText =`${newChangPerc}%`
  
  dashCoin.appendChild(name1)
  dashCoin.appendChild(sym1)
  dashCoin.appendChild(priceDash)
  dashCoin.appendChild(percChange)
  dashTable.appendChild(dashCoin)

}

// Initializer
getAllInfo().then(renderAll)