const API_URL = 'https://api.github.com/';

var rootEl = document.getElementById("root");
var loadEl = document.getElementById("loading-overlay");

async function startApp() {
  try {
    loadEl.style.visibility = 'visible';
    
    const endpoint = 'repos/sahanr/street-fighter/contents/fighters.json';
    const fighters = await callApi(endpoint, 'GET');
    
    rootEl.innerText = getFightersNames(fighters);
  } catch (error) {
    console.warn(error);
    rootEl.innerText = 'Failed to load data';
  } finally {
    loadEl.style.visibility = 'hidden';
  }
}

function callApi(endpoind, method) {
  const url = API_URL + endpoind
  const options = {
    method
  };

  return fetch(url, options)
    .then(response => 
      response.ok 
        ? response.json() 
        : Promise.reject(Error('Failed to load'))
    )
    .then(file => JSON.parse(atob(file.content)))
    .catch(error => { throw error });
}




/*
const API_URL = 'https://api.github.com/';

var rootEl = document.getElementById("root");
var loadEl = document.getElementById("loading-overlay");
loadEl.style.visibility = "visible";

const startApp = function() {
  const endpoint = 'repos/sahanr/street-fighter/contents/fighters.json';
  const fightersPromise = callApi(endpoint, 'GET');
  
  fightersPromise.then(fighters => {
    const fightersNames = getFightersNames(fighters);
    rootEl.innerText = fightersNames;
  });	
}

function callApi(endpoind, method) {
  const url = API_URL + endpoind;
  const options = {
    method
  };

  return fetch(url, options)
    .then(response => response.ok ? response.json() : Promise.reject(Error('Failed to load')))
    .then(file => JSON.parse(atob(file.content)))
    .catch(error => {
      console.warn(error);
      rootEl.innerText = 'Failed to load data';
    })
    .finally(() => {
      loadEl.style.visibility = "";
    });
}

*/

function getFightersNames(fighters) {
  const names = fighters.map(it => it.name).join('\n');
  return names;
}

startApp();
