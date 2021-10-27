let requestOptions = {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow'
  }

  //This API pulls the top 100 MarketCap cryptocurrencies 
  const base_URL = 'https://api.coincap.io/v2/assets/'
  
  // DOM selectors

  // const featCoin = document.querySelector(#featured-coin)
  // const coinNameCol = document.querySelector('#coinNames')
  // const coinSymCol = document.querySelector('#coinSyms')
  // const coinPriceCol = document.querySelector('#coinPrices')
  // const coinMarketCapCol = document.querySelector('#coinMarkCapPrice')
  // const coinPercChangCol = document.querySelector('#coinPercChang')
  // const coinFavBtnCol = document.querySelector('#coinFavBtn')
  const coinsTable = document.querySelector('.table')

  // EVENT LISTENERS

  //GET json data from API and parse into objects
//FETCHERS

function getAllInfo() {
  return fetch(base_URL, requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error:'))
}
  
function getOneCoin(coinName) {
  return fetch(base_URL + `${coinName}`)
    .then(response => response.json())
    .then(res => res)
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

  coinName.innerText = `${coinObj.name}`
  coinSym.innerText = `${coinObj.symbol}`
  coinPrice.innerText =`$${price}`
  coinMarketCap.innerText =`$${marketPrice}`
  coinPercent.innerText =`${changPerc}%`
  addFav.innerText = 'Add to Dash'

  
  coin.addEventListener('click', handleAddToFeatured)
  addFav.addEventListener('click', handleAddToDash)
  
  coinFav.appendChild(addFav)
  coin.appendChild(coinName)
  coin.appendChild(coinSym)
  coin.appendChild(coinPrice)
  coin.appendChild(coinMarketCap)
  coin.appendChild(coinPercent)
  coin.appendChild(coinFav)
  coinsTable.appendChild(coin)
}

// Handlers
function handleAddToFeatured (e) {
  e.preventDefault();
  e.stopPropagation();
  console.log('e: ', e);
}

function handleAddToDash (e) {
  e.preventDefault();
  e.stopPropagation();
  console.log('e: ', e);
}


// Initializer
getAllInfo().then(renderAll)
