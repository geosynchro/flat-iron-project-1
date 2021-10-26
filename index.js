


//This API pulls the top 100 MarketCap cryptocurrencies 
  
const base_URL = 'https://api.coincap.io/v2/assets/'
  
//DOM Selectors
const coinList = document.querySelector('#coinlist')


//Listeners

//Fetchers

let requestOptions = {
  method: 'GET',
  mode: 'cors',
  redirect: 'follow'
};

function getAllCoins(){
  return fetch(base_URL, requestOptions)
  .then(response => response.json())
  .then(result => result)
  .catch(error => console.log('error', error));
}

function getOneCoin(coinName){
  fetch(base_URL + `${coinName}`)
  .then(response => response.json())
  .then(res => console.log(res))
}

//Renderers

function renderAllCoins(coinArr){
  console.log(coinArr)
  coinArr.data.forEach(renderOneCoin)
}

function renderOneCoin(coinObj){
  const newCoin = document.createElement('li')
  const coinName = coinObj.name
  const price = parseFloat(coinObj.priceUsd).toFixed(2)
  const change = parseFloat(coinObj.changePercent24Hr).toFixed(2)
  newCoin.textContent = `${coinName}  |  Price(USD):${price}  |  
                          Change(last 24hrs):${change}% 
                        `
  newCoin.addEventListener('click', () => displayDetails(coinObj))                     
  coinList.append(newCoin)
}

function displayDetails(coinObj){
  console.log(coinObj)
}




//Event Handlers

//Initializers


//GET json data from API and parse into objects


getAllCoins().then(renderAllCoins)
// getOneCoin('bitcoin')