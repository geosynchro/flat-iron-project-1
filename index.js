// END POINTS
const base_URL = 'http://localhost:3000/data'
const apiURL = 'https://api.coinlore.net/api/tickers/'

// DOM selectors
const coinsTable = document.querySelector('.table')
const dashTable = document.querySelector('.coinDash')

//Featured Coin
const featuredCoinNameSym = document.querySelector('#featCoinNameSym')
const featImg = document.querySelector('#cryptoIcon')
const featPrice = document.querySelector('#detailPrice')
const featRank = document.querySelector('#detailRank')
const featPerc = document.querySelector('#detailPerc')
const featMarkCap = document.querySelector('#detailMarkCap')
const featSupp = document.querySelector('#detailCurrSupp')

//FETCH FXNS
function getAllInfo() {
  return fetch(base_URL, {
    method: 'GET'})
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error:', error))
}

function getOneDetail(id) {
  return fetch(base_URL + `/${id}`, {
    method: 'GET'})
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error:', error))
}

//RENDER FXNS
function renderAll(allCoinsObj) {
  allCoinsObj.forEach(renderCoinList)
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

  coin.id = `${coinObj.nameid}`
  coin.className = 'favBtn'
  coinName.innerText = `${coinObj.name}`
  coinSym.innerText = `${coinObj.symbol}`
  coinPrice.innerText =`$${coinObj.price_usd}`
  coinMarketCap.innerText =`$${coinObj.market_cap_usd}`
  coinPercent.innerText =`${coinObj.percent_change_24h}%`
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
  featImg.src = `cryptocurrency-icons/icons/${coinObj.nameid}.png`
  featuredCoinNameSym.textContent = `${coinObj.name} | ${coinObj.symbol}`
  featPrice.textContent = `${coinObj.price_usd}`
  featRank.textContent = `${coinObj.rank}`
  featPerc.textContent = `${coinObj.percent_change_24h}`
  featMarkCap.textContent = `${coinObj.market_cap_usd}`
  featSupp.textContent = `${coinObj.csupply}`
}
//HANDLER FXNS

// INITIALIZERS 
getAllInfo().then(renderAll)
getOneDetail(90).then(renderCoinDetail)