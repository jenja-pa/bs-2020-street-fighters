const API_URL = 'https://api.github.com/';
const fightersDetailsMap = new Map();

var rootEl = document.getElementById("root");
var loadEl = document.getElementById("loading-overlay");

async function startApp() {
  try {
    loadEl.style.visibility = 'visible';
    
    const endpoint = 'repos/sahanr/street-fighter/contents/fighters.json';
    const fighters = await callApi(endpoint, 'GET');
    
    // rootEl.innerText = getFightersNames(fighters);
    const fightersEls = createFighters(fighters);
    rootEl.appendChild(fightersEls);

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

function getFightersNames(fighters) {
  const names = fighters.map(it => it.name).join('\n');
  return names;
}

function createElement({ tagName, className = '', attributes = {} }) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  
  Object
    .keys(attributes)
    .forEach(key => element.setAttribute(key, attributes[key]));

  return element;
}
function createName(name) {
  const nameElement = createElement({ tagName: 'span', className: 'name' });
  nameElement.innerText = name;

  return nameElement;
}

function createImage(source) {
  const attributes = { src: source };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-image',
    attributes
  });

  return imgElement;
}
function createFighter(fighter) {
  const { name, source } = fighter;
  const nameElement = createName(name);
  const imageElement = createImage(source);
  const element = createElement({ tagName: 'div', className: 'fighter' });


  element.addEventListener('click', (event) => handleFighterClick(event, fighter), false);

  function handleFighterClick(event, fighter) {
    const { _id } = fighter;

    if(!fightersDetailsMap.has(_id)) {
      // send request here
      fightersDetailsMap.set(_id, fighter);
    }

    console.log(fightersDetailsMap.get(_id));
  }


  // nameElement.addEventListener('click', (event) => handleFighterClick(event, 'text'), false)
  // element.addEventListener('click', (event) => handleFighterClick(event, 'wrapper'), false);
  // imageElement.addEventListener('click', (event) => handleFighterClick(event, 'image'), false);

  // function handleFighterClick(event, el) {
  //   console.log(el);
  // }

  element.append(imageElement, nameElement);

  return element;
}
function createFighters(fighters) {
  const fighterElements = fighters.map(fighter => createFighter(fighter));
  const element = createElement({ tagName: 'div', className: 'fighters' });

  element.append(...fighterElements);

  return element;
}

startApp();
