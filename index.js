const API_URL = 'https://api.github.com/repos/sahanr/street-fighter/contents/fighters.json';

var rootEl = document.getElementById("root");
rootEl.innerText = "Loading ...";

fetch(API_URL)
	.then( resp => resp.json() )
	.then( file => {
		const fighters = JSON.parse(atob(file.content));
		const names =  fighters.map(el => el.name).join("\n");
		rootEl.innerText = names;
	});