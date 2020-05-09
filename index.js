const API_URL = 'https://api.github.com/repos/sahanr/street-fighter/contents/fighters.json';

const responsePromise = fetch(API_URL);
responsePromise.then(response => { response.json() });