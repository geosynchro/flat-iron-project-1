//This API pulls the top 100 MarketCap cryptocurrencies 
  
const base_URL = 'https://api.coincap.io/v2/assets/'
  
//DOM Selectors
 
const coinList = document.querySelector('#coinlist')
const featCoin = document.querySelector('#featured-coin')

//featured details selectors
const featured= document.querySelector("#featured-coin")
const detName = document.querySelector('#detName')
const detSym = document.querySelector('#coinSym')
const curPrice = document.querySelector('#curPrice')
const perChange = document.querySelector('#perChange')
const markCap = document.querySelector('#markCap')
const searchForm = document.querySelector('#coinSearch')
const displayedCoin = document.querySelector('#displayedCoin')



//Listeners
searchForm.addEventListener('submit', handleSearch)

//Fetchers


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

//Renderers

function renderAllCoins(coinArr){
  // console.log(coinArr)
  coinArr.data.forEach(renderOneCoin)
}

function renderOneCoin(coinObj){
  const newCoin = document.createElement('li')
  const favBtn = document.createElement('button')
  favBtn.id = 'favBtn'
  favBtn.textContent = 'Favorite'
  const coinName = coinObj.name
  const price = parseFloat(coinObj.priceUsd).toFixed(2)
  const change = parseFloat(coinObj.changePercent24Hr).toFixed(2)
  newCoin.textContent = `${coinName}  |  Price(USD):${price}  |  
                          Change(last 24hrs):${change}% 
                        `                
  favBtn.addEventListener('click', handleAddDash)                      
  
  newCoin.addEventListener('click', () => displayDetails(coinObj))

  newCoin.appendChild(favBtn)
  coinList.append(newCoin)
}

function displayDetails(coinObj){
  detName.textContent = coinObj.name
  detSym.textContent = `Ticker symbol: ${coinObj.symbol}`
  curPrice.textContent = `Current Price: ${(parseFloat(coinObj.priceUsd)).toFixed(2)}`
  perChange.textContent = `Percent Change(24hrs): ${parseFloat(coinObj.changePercent24Hr).toFixed(2)}`
  markCap.textContent = `Total Market Cap: ${parseFloat(coinObj.marketCapUsd).toFixed(2)}`
  // console.log(coinObj)
}

function displaySearch(coinObj){
  const newCoin = document.createElement('p')
  const favBtn = document.createElement('button')
  const dltBtn = document.createElement('button')
  favBtn.id = 'favBtn'
  favBtn.textContent = 'Favorite'
  dltBtn.id = "dltBtn"
  dltBtn.textContent = "Remove"
  const coinName = coinObj.name
  const price = parseFloat(coinObj.priceUsd).toFixed(2)
  const change = parseFloat(coinObj.changePercent24Hr).toFixed(2)
  newCoin.textContent = `${coinName}  |  Price(USD):${price}  |  
                          Change(last 24hrs):${change}% 
                        `                
  favBtn.addEventListener('click', handleAddDash)                      
  dltBtn.addEventListener('click', () => newCoin.remove())
  newCoin.addEventListener('click', () => displayDetails(coinObj))


  newCoin.appendChild(favBtn)
  newCoin.appendChild(dltBtn)
  displayedCoin.appendChild(newCoin)
}





//Event Handlers

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

//Initializers


//GET json data from API and parse into objects


getAllCoins().then(renderAllCoins)
getOneCoin('bitcoin')

