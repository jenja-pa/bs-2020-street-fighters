const API_URL = 'https://api.github.com/repos/sahanr/street-fighter/contents/fighters.json';
/*
const respPromise = fetch(API_URL);

respPromise.then(resp => { console.log(resp.json()) });
*/ 

fetch(API_URL)
	.then( resp => resp.json() )
	.then( file => {
		const fighters = JSON.parse(atob(file.content));
		const names =  fighters.map(el => el.name).join("\n");
		console.log(names);
	});