// END POINTS
const base_URL = 'http://localhost:3000'
const dataURL= 'http://localhost:3000/data'
const apiURL = 'https://api.coinlore.net/api/tickers/'



// DOM SELECTORS
const coinsTable = document.querySelector('.table')
const searchForm = document.querySelector('.form-inline')
const dupAction = document.querySelector('#duplicate')

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

//EVENT LISTENERS
searchForm.addEventListener('submit',handleSearchForm)

//FETCH FXNS
function getAllInfo() {
  return fetch(dataURL, {
    method: 'GET'})
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error:', error))
}

function getNewInfo() {
  fetch(dataURL, {
    method: 'GET'})
    .then(response => response.json())
    .then(result => result.forEach(updateNumbers))
    .catch(error => console.log('error:', error))
}

function postData(coinForDash) {
  console.log(JSON.stringify(coinForDash));
  fetch (base_URL + '/dashCoin', {
    method: 'POST',
    headers: {
    'Content-Type':'application/json'
    },
    body: JSON.stringify(coinForDash)
  }).then(renderToDash(coinForDash))
}

function getDashCoin () {
  fetch (base_URL + '/dashCoin')
  .then (r => r.json())
  .then (data => data.forEach(renderToDash))
}

function deleteDashCoin (id) {
  fetch (`http://localhost:3000/dashCoin/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type':'application/json'
      } 
  })
}

function getOneDetail(id) {
  return fetch(dataURL + `/${id}`, {
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
  
  coinName.addEventListener('click', () => renderCoinDetail(coinObj))
  coinSym.addEventListener('click', () => renderCoinDetail(coinObj))
  coinPrice.addEventListener('click', () => renderCoinDetail(coinObj))
  coinMarketCap.addEventListener('click', () => renderCoinDetail(coinObj))
  coinPercent.addEventListener('click', () => renderCoinDetail(coinObj))
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

function renderToDash (coinObj) {
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
  removeBtn.id = 'deleteDash'

  coinDashName.innerText = `${coinObj.name}`
  coinDashSym.innerText = `${coinObj.symbol}`
  coinDashPrice.innerText = `${coinObj.price_usd}`
  coinDashPerc.innerText = `${coinObj.percent_change_24h}`
  removeBtn.innerText = `Delete`

  
  coinDashName.addEventListener('click', () => renderCoinDetail(e, coinObj))
  coinDashSym.addEventListener('click', () => renderCoinDetail(e, coinObj))
  coinDashPrice.addEventListener('click', () => renderCoinDetail(e, coinObj))
  coinDashPerc.addEventListener('click', () => renderCoinDetail(e, coinObj))
  
  removeBtn.addEventListener('click', () => {
    coinDashRow.remove()
    deleteDashCoin (coinObj.id)
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
function handleSearchForm (e) {
  e.preventDefault();
}

function handleAddToDash (e, coinObj) {

// function fadeOutEffect(fadeTarget) {
//     var fadeEffect = setInterval(function () {
//         if (!fadeTarget.style.opacity) {
//             fadeTarget.style.opacity = 1;
//         }
//         if (fadeTarget.style.opacity > 0) {
//             fadeTarget.style.opacity -= 0.1;
//         } else {
//             clearInterval(fadeEffect);
//         }
//     }, 200);
// }
function findDups (coinName, dashName) {
  console.log('coinName, dashName: ', coinName, dashName);
    if (coinObj == dashName) {
        coinObj.remove()
        deleteDashCoin(coinObj)
        console.log('You already have!')
        return;
      }
    }
    
  e.preventDefault()
  e.stopPropagation()
  const coinForDash = {
    "coinid": coinObj.id,
    "symbol": coinObj.symbol,
    "name": coinObj.name,
    "nameid": coinObj.nameid,
    "rank": coinObj.rank,
    "price_usd": coinObj.price_usd,
    "percent_change_24h": coinObj.percent_change_24h,
  }
  
  findDups(coinForDash.name, coinObj.name)
  postData(coinForDash)
}

function updateNumbers (coinObj) {
  const newCoin = {
    "coinid": coinObj.id,
    "symbol": coinObj.symbol,
    "name": coinObj.name,
    "nameid": coinObj.nameid,
    "rank": coinObj.rank,
    "price_usd": coinObj.price_usd,
    "percent_change_24h": coinObj.percent_change_24h,
    "percent_change_1h": coinObj.percent_change_1h,
    "percent_change_7d": coinObj.percent_change_7d,
    "price_btc": coinObj.price_btc,
    "market_cap_usd": coinObj.market_cap_usd,
    "volume24": coinObj.volume24,
    "volume24a": coinObj.volume24a,
    "csupply": coinObj.csupply,
    "tsupply": coinObj.tsupply,
    "msupply": coinObj.msupply
  }
  // renderCoinList(newCoin)
  // patchData(newCoin)
}
// INITIALIZERS 
getAllInfo().then(renderAll)
getOneDetail(90).then(renderCoinDetail)
getDashCoin()