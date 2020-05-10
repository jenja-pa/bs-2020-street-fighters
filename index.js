// const API_URL = 'https://api.github.com/';
// const fightersDetailsMap = new Map();
// const rootEl = document.getElementById("root");
// const loadEl = document.getElementById("loading-overlay");

function callApi(endpoind, method) {
  const url = endpoind;
  const options = {
    method
  };

  return fetch(url, options)
    .then(response => 
      response.ok 
        ? response.json() 
        : Promise.reject(Error('Failed to load'))
    )
     .catch(error => { throw error });
}

class FighterService {
  async getFighters() {
    try {
      const API_URL = 'https://api.github.com/';
      const endpoint = 'repos/sahanr/street-fighter/contents/fighters.json';
      const apiResult = await callApi(API_URL+endpoint, 'GET');

      return JSON.parse(atob(apiResult.content));
    } catch (error) {
      throw error;
    }
  }
}

const fighterService = new FighterService();

class View {
  element;

  createElement({ tagName, className = '', attributes = {} }) {
    const element = document.createElement(tagName);
    element.classList.add(className);
    
    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));

    return element;
  }
}

class FighterView extends View {
  constructor(fighter, handleClick) {
    super();

    this.createFighter(fighter, handleClick);
  }

  createFighter(fighter, handleClick) {
    const { name, source } = fighter;
    const nameElement = this.createName(name);
    const imageElement = this.createImage(source);

    this.element = this.createElement({ tagName: 'div', className: 'fighter' });
    this.element.append(imageElement, nameElement);
    this.element.addEventListener('click', event => handleClick(event, fighter), false);
  }

  createName(name) {
    const nameElement = this.createElement({ tagName: 'span', className: 'name' });
    nameElement.innerText = name;

    return nameElement;
  }

  createImage(source) {
    const attributes = { src: source };
    const imgElement = this.createElement({
      tagName: 'img',
      className: 'fighter-image',
      attributes
    });

    return imgElement;
  }
}

class FightersView extends View {
  constructor(fighters) {
    super();
    
    this.handleClick = this.handleFighterClick.bind(this);
    this.createFighters(fighters);
  }

  fightersDetailsMap = new Map();

  createFighters(fighters) {
    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, this.handleClick);
      return fighterView.element;
    });

    this.element = this.createElement({ tagName: 'div', className: 'fighters' });
    this.element.append(...fighterElements);
  }

  handleFighterClick(event, fighter) {
    this.fightersDetailsMap.set(fighter._id, fighter);
    console.log('clicked')
    // get from map or load info and add to fightersMap
    // show modal with fighter info
    // allow to edit health and power in this modal
  }
}

class App {
  constructor() {
    this.startApp();
  }

  static rootElement = document.getElementById('root');
  static loadingElement = document.getElementById('loading-overlay');

  async startApp() {
    try {
      App.loadingElement.style.visibility = 'visible';
      
      const fighters = await fighterService.getFighters();
      const fightersView = new FightersView(fighters);
      const fightersElement = fightersView.element;

      App.rootElement.appendChild(fightersElement);
    } catch (error) {
      console.warn(error);
      App.rootElement.innerText = 'Failed to load data';
    } finally {
      App.loadingElement.style.visibility = 'hidden';
    }
  }
}

new App();

// async function startApp() {
//   try {
//     loadEl.style.visibility = 'visible';
    
//     const endpoint = 'repos/sahanr/street-fighter/contents/fighters.json';
//     const fighters = await callApi(endpoint, 'GET');
    
//     // rootEl.innerText = getFightersNames(fighters);
//     const fightersEls = createFighters(fighters);
//     rootEl.appendChild(fightersEls);

//   } catch (error) {
//     console.warn(error);
//     rootEl.innerText = 'Failed to load data';
//   } finally {
//     loadEl.style.visibility = 'hidden';
//   }
// }

// function getFightersNames(fighters) {
//   const names = fighters.map(it => it.name).join('\n');
//   return names;
// }

// function createElement({ tagName, className = '', attributes = {} }) {
//   const element = document.createElement(tagName);
//   element.classList.add(className);
  
//   Object
//     .keys(attributes)
//     .forEach(key => element.setAttribute(key, attributes[key]));

//   return element;
// }
// function createName(name) {
//   const nameElement = createElement({ tagName: 'span', className: 'name' });
//   nameElement.innerText = name;

//   return nameElement;
// }

// function createImage(source) {
//   const attributes = { src: source };
//   const imgElement = createElement({
//     tagName: 'img',
//     className: 'fighter-image',
//     attributes
//   });

//   return imgElement;
// }
// function createFighter(fighter) {
//   const { name, source } = fighter;
//   const nameElement = createName(name);
//   const imageElement = createImage(source);
//   const element = createElement({ tagName: 'div', className: 'fighter' });


//   element.addEventListener('click', (event) => handleFighterClick(event, fighter), false);

//   function handleFighterClick(event, fighter) {
//     const { _id } = fighter;

//     if(!fightersDetailsMap.has(_id)) {
//       // send request here
//       fightersDetailsMap.set(_id, fighter);
//     }

//     console.log(fightersDetailsMap.get(_id));
//   }


//   // nameElement.addEventListener('click', (event) => handleFighterClick(event, 'text'), false)
//   // element.addEventListener('click', (event) => handleFighterClick(event, 'wrapper'), false);
//   // imageElement.addEventListener('click', (event) => handleFighterClick(event, 'image'), false);

//   // function handleFighterClick(event, el) {
//   //   console.log(el);
//   // }

//   element.append(imageElement, nameElement);

//   return element;
// }
// function createFighters(fighters) {
//   const fighterElements = fighters.map(fighter => createFighter(fighter));
//   const element = createElement({ tagName: 'div', className: 'fighters' });

//   element.append(...fighterElements);

//   return element;
// }

// startApp();
