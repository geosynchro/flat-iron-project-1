let requestOptions = {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow'
  };


  //This API pulls the top 100 MarketCap cryptocurrencies 
  const base_URL = 'https://api.coincap.io/v2/assets/'
  
  // DOM selectors


  //GET json data from API and parse into objects

function getAllInfo() {
  return fetch(base_URL, requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error', error));
}
  
    function getOneCoin(coinName){
      return fetch(base_URL + `${coinName}`)
      .then(response => response.json())
      .then(res => console.log(res))
    }

//Render Functions
function renderAll(arr) {
  arr.data.forEach(renderCoinList)
}

function renderCoinList(coinObj) {
  const coin = document.createElement('li')
  const price = parseFloat(coinObj.priceUsd).toFixed(2)
  console.log('coin: ', coin);
  coin.id = `${coinObj.id}`
  coin.innerText = `${coinObj.name} | Price: ${price}`
  coin.addEventListener('click', addToDash)
  cryptoItemsList.appendChild(coin);
}

// Initializer
getAllInfo().then(renderAll)
