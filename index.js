// END POINTS
const base_URL = 'http://localhost:3000/data/'
const apiURL = 'https://api.coinlore.net/api/tickers/'

// DOM selectors
const coinsTable = document.querySelector('.table')

//Featured Coin
const featuredCoinNameSym = document.querySelector('#featCoinNameSym')
const featImg = document.querySelector('#cryptoIcon')
const featPrice = document.querySelector('#detailPrice')
const featRank = document.querySelector('#detailRank')
const featPerc = document.querySelector('#detailPerc')
const featMarkCap = document.querySelector('#detailMarkCap')
const featSupp = document.querySelector('#detailCurrSupp')

//Dash Coins
const dashTable = document.querySelector('.dash')

//FETCH FXNS
function getAllInfo() {
   fetch(base_URL, {
    method: 'GET'})
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error:', error))
}

// function getNewInfo() {
//   fetch(base_URL, {
//     method: 'GET'})
//     .then(response => response.json())
//     .then(result => result.forEach(updateNumbers))
//     .catch(error => console.log('error:', error))
// }

// function postData(coinObj) {
//   fetch ('http://localhost:3000/data', {
//     method: 'POST',
//     body: JSON.stringify(coinObj),
//     header: {
//     'Content-Type':'application/json'
//     }
//   })
//   .then(r => r.json())
//   .then(data => console.log(data))
// }

function getOneDetail(id) {
  fetch (`http://localhost:3000/data${id}`, {
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
  
  addFav.addEventListener('click', (e) => renderToDash(e, coinObj))
  coinName.addEventListener('click', (e) => renderCoinDetail(e, coinObj))
  coinSym.addEventListener('click', (e) => renderCoinDetail(e, coinObj))
  coinPrice.addEventListener('click', (e) => renderCoinDetail(e, coinObj))
  coinMarketCap.addEventListener('click', (e) => renderCoinDetail(e, coinObj))
  coinPercent.addEventListener('click', (e) => renderCoinDetail(e, coinObj))
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

function renderCoinDetail (e, coinObj) {
  e.stopPropagation();
  featImg.src = `cryptocurrency-icons/icons/${coinObj.nameid}.png`
  featuredCoinNameSym.textContent = `${coinObj.name} | ${coinObj.symbol}`
  featPrice.textContent = `${coinObj.price_usd}`
  featRank.textContent = `${coinObj.rank}`
  featPerc.textContent = `${coinObj.percent_change_24h}`
  featMarkCap.textContent = `${coinObj.market_cap_usd}`
  featSupp.textContent = `${coinObj.csupply}`
}

function renderToDash (e, coinObj) {
  e.stopPropagation();
  
  const coinDashRow = document.createElement('tr')
  const coinDashName = document.createElement('td')
  const coinDashSym = document.createElement('td')
  const coinDashPrice = document.createElement('td')
  const coinDashPerc = document.createElement('td')
  const remove = document.createElement('td')
  const removeBtn = document.createElement('button')
  
  coinDashRow.id = 'coinDash'
  coinDashName.id = 'coinName'
  coinDashSym.id = 'coinSym'
  coinDashPrice.id = 'coinPrice'
  coinDashPerc.id = 'coinPerc'

  coinDashName.innerText = `${coinObj.name}`
  coinDashSym.innerText = `${coinObj.symbol}`
  coinDashPrice.innerText = `${coinObj.price_usd}`
  coinDashPerc.innerText = `${coinObj.percent_change_24h}`
  removeBtn.innerText = `Delete`

  
  coinDashName.addEventListener('click', (e) => renderCoinDetail(e, coinObj))
  coinDashSym.addEventListener('click', (e) => renderCoinDetail(e, coinObj))
  coinDashPrice.addEventListener('click', (e) => renderCoinDetail(e, coinObj))
  coinDashPerc.addEventListener('click', (e) => renderCoinDetail(e, coinObj))
  
  removeBtn.addEventListener('click', () => {
    coinDashRow.remove()
  })

  coinDashRow.appendChild(coinDashName)
  coinDashRow.appendChild(coinDashSym)
  coinDashRow.appendChild(coinDashPrice)
  coinDashRow.appendChild(coinDashPerc)
  remove.appendChild(removeBtn)
  coinDashRow.appendChild(remove)
  dashTable.append(coinDashRow)

}

//HANDLER FXNS
// function handleAddToDash (e, coinObj) {
//   e.preventDefault()
//   e.stopPropagation()
//   // postData(coinObj)
// }
// INITIALIZERS 
getAllInfo().then
getOneDetail(90).then(renderCoinDetail(e, coinObj))