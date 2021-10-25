let requestOptions = {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow'
  };

  const base_URL = 'https://api.coincap.io/v2/assets'
  
  fetch(base_URL, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));