const API_URL = 'https://api.github.com/repos/sahanr/street-fighter/contents/fighters.json';

var rootEl = document.getElementById("root");
var loadEl = document.getElementById("loading-overlay");
loadEl.style.visibility = "visible";

//rootEl.innerText = "Loading ...";

fetch(API_URL)
	.then( resp => {
		console.log(resp);
		if(!resp.ok){
			return Promise.reject(new Error("Not Good we do not get correct response. from: "+ API_URL));
		}
		return resp.json();})
	.then( file => {
		console.log(file);
		const fighters = JSON.parse(atob(file.content));
		const names =  fighters.map(el => el.name).join("\n");
		rootEl.innerText = names;
	})
	.catch(err => {
		console.warn(err);
		rootEl.innerText = err;
	})
	.finally(()=>{
		loadEl.style.visibility = "";
	});