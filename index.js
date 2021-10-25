let requestOptions = {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow'
  };


  //This API pulls the top 100 MarketCap cryptocurrencies 
  const base_URL = 'https://api.coincap.io/v2/assets/'
  

  //GET json data from API and parse into objects

  fetch(base_URL, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
 
  
    function getOneCoin(coinName){
      fetch(base_URL + `${coinName}`)
      .then(response => response.json())
      .then(res => console.log(res))
    }

    getOneCoin('bitcoin')