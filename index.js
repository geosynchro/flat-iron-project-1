//URLs-----------------------------------------------------
  
const base_URL = 'https://api.coincap.io/v2/assets/'
  
//DOM Selectors----------------------------------------------
 
const coinList = document.querySelector('#coinlist')
const featCoin = document.querySelector('#featured-coin')
const featured= document.querySelector("#featured-coin")
const detName = document.querySelector('#detName')
const detSym = document.querySelector('#coinSym')
const curPrice = document.querySelector('#curPrice')
const perChange = document.querySelector('#perChange')
const markCap = document.querySelector('#markCap')
const searchForm = document.querySelector('#coinSearch')
const displayedCoin = document.querySelector('#displayedCoin')
const coinsTable = document.querySelector('.table')
const ticker = document.querySelector('.crypto-scroll')
const tickerCoins = document.getElementsByClassName('tickCoin')


//Listeners----------------------------------------------
searchForm.addEventListener('submit', handleSearch)


//Fetchers----------------------------------------------


function getAllCoins(){
  return fetch(base_URL)
  .then(response => response.json())
  .then(result => result)
  .catch(error => console.log('error', error));
}

function getOneCoin(coinName){
  fetch(base_URL + `${coinName}`)
  .then(response => response.json())
  .then(response => displayDetails(response.data));
  
}

//Renderers-----------------------------------------------

function renderAllCoins(coinsArr) {
  coinsArr.data.forEach(renderCoinList)
  coinsArr.data.slice(0, 20).forEach(addCoinToTicker)
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
  coin.addEventListener('click', () => displayDetails(coinObj))
  addFav.addEventListener('click', handleAddDash)
  coinFav.appendChild(addFav)
  coin.appendChild(coinName)
  coin.appendChild(coinSym)
  coin.appendChild(coinPrice)
  coin.appendChild(coinMarketCap)
  coin.appendChild(coinPercent)
  coin.appendChild(coinFav)
  coinsTable.appendChild(coin)
}

function displayDetails(coinObj){
  detName.textContent = coinObj.name
  detSym.textContent = `Ticker symbol: ${coinObj.symbol}`
  curPrice.textContent = `Current Price: $${(parseFloat(coinObj.priceUsd)).toFixed(2)}`
  perChange.textContent = `Percent Change(24hrs): ${parseFloat(coinObj.changePercent24Hr).toFixed(2)}%`
  markCap.textContent = `Total Market Cap: $${parseFloat(coinObj.marketCapUsd).toFixed(2)}`
}

function displaySearch(coinObj){
  const newCoin = document.createElement('p')
  const favBtn = document.createElement('button')
  const dltBtn = document.createElement('button')
  newCoin.id = "searchedCoin"
  favBtn.id = 'favBtn'
  favBtn.textContent = 'Favorite'
  dltBtn.id = "dltBtn"
  dltBtn.textContent = "Remove"

  const coinName = coinObj.name
  const price = parseFloat(coinObj.priceUsd).toFixed(2)
  const change = parseFloat(coinObj.changePercent24Hr).toFixed(2)
  newCoin.textContent = `${coinName}  |  Price(USD):${price}  |  Change(last 24hrs):${change}%`                
  favBtn.addEventListener('click', handleAddDash)                      
  dltBtn.addEventListener('click', handleRemove)
  newCoin.addEventListener('click', () => displayDetails(coinObj))
  
  newCoin.appendChild(favBtn)
  newCoin.appendChild(dltBtn)
  displayedCoin.appendChild(newCoin)
  return newCoin;
}

function addCoinToTicker(coinObj){
  const spanCoin = document.createElement('span')
  const sym = coinObj.symbol
  const price = parseFloat(coinObj.priceUsd).toFixed(2)
  const percChange = parseFloat(coinObj.changePercent24Hr).toFixed(2)
  spanCoin.className = "tickCoin"
  spanCoin.textContent = `  ${sym}: $${price}, ${percChange}%(24hrs)   `
  
  spanCoin.addEventListener('click', () => displayDetails(coinObj))

  function colorChange(coinObj){
    if(coinObj.changePercent24Hr > 0){
      spanCoin.style.color = 'green'
    }else if(coinObj.changePercent24Hr < 0){
      spanCoin.style.color = 'red'
    }else{
      spanCoin.style.color = 'black'
    }
  }
  colorChange(coinObj);
  ticker.append(spanCoin)
}
 
//copied function from boostrap for table
// $(document).ready(function () {
//   $('#dtDynamicVerticalScrollExample').DataTable({
//   "scrollY": "50vh",
//   "scrollCollapse": true,
//   });
//   $('.dataTables_length').addClass('bs-select');
//   });

// document.querySelector(document).ready(function(){
//   document.querySelector('#dtDynamicVerticalScrollExample').DataTable(
//     "scrollY": "50vh","scrollCollapse": true,);
//   document.querySelector('.dataTables_length').classList.add('bs-select')
// });




//Event Handlers----------------------------------------------

function handleRemove(e){
  e.preventDefault()
  e.stopPropagation()
  const coin = document.querySelector('#searchedCoin')
  coin.remove();
}

function handleAddDash(e){
  e.preventDefault();
  e.stopPropagation();
  console.log('clicked')
}

function handleSearch(e){
  e.preventDefault();
  let query = document.querySelector('#searchHere').value
  searchForm.reset();
  
  fetch(base_URL +`${query}`)
  .then(resp => resp.json())
  .then(coins => displaySearch(coins.data));
  
  console.log('clicked')
}

//Initializers----------------------------------------------


getAllCoins().then(renderAllCoins)
getOneCoin('bitcoin')



// function renderAllCoins(coinArr){
//   // console.log(coinArr)
//   coinArr.data.forEach(renderOneCoin)
// }

// function renderOneCoin(coinObj){
  //   const newCoin = document.createElement('li')
  //   const favBtn = document.createElement('button')
  //   favBtn.id = 'favBtn'
  //   favBtn.textContent = 'Favorite'
  //   const coinName = coinObj.name
  //   const price = parseFloat(coinObj.priceUsd).toFixed(2)
  //   const change = parseFloat(coinObj.changePercent24Hr).toFixed(2)
  //   newCoin.textContent = `${coinName}  |  Price(USD):${price}  |  
  //                           Change(last 24hrs):${change}% 
//                         `                
//   favBtn.addEventListener('click', handleAddDash)                      
  
//   newCoin.addEventListener('click', () => displayDetails(coinObj))

//   newCoin.appendChild(favBtn)
//   coinList.append(newCoin)
// }