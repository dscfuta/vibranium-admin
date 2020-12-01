// instantiation of all components
// select menu
const selectMenu = new mdc.select.MDCSelect(document.querySelector('.mdc-select'));

// tabbar
const tabBar = new mdc.tabBar.MDCTabBar(document.querySelector('.mdc-tab-bar'));

// ripples
const selector = '.mdc-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), (el) => {
  return new mdc.ripple.MDCRipple(el);
});
// END OF INSTANTIATION OF COMPONENT

// FIREBASE
// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});
// Initialize Firebase Storage
const storage = firebase.storage();
const storageRef = storage.ref();

// constants
const stateOfMaterialsToPresent = {
  stack: 'all',
  category: 'book'
}


// functions
const handleMaterialsRendering = (state) => {
  renderSpinner();
  // get materials from firebase firestore
  db.collection('materials').get()
  .then(snapshots => {
    let materials = [];
    snapshots.forEach(snapshot => {
      const material = {
        id: snapshot.id,
        data: snapshot.data()
      }
      materials.push(material);
    })
    
    // filter materials
    const filteredMaterials = getFilteredMaterial(state, materials);

    // checking if there are materials present for the selected state
    if (filteredMaterials[0]) {
      // creating material cards
      const materialCards = generateMaterialCards(filteredMaterials)
      console.log('generated: ')

      // render the material
      renderContent(materialCards);
    }else {
      throw new Error('no material present for this category selected')
    }
  })
  .catch(err => renderError(err));
}
const getFilteredMaterial = (state, materials) => {
  let filteredMaterials = [];
  
  if (state.stack === 'all') {
    filteredMaterials = materials.filter(material => {
      return state.category === material.data.type;
    })
  }else {
    filteredMaterials = materials.filter(material => {
      return state.category === material.data.type && state.stack === material.data.stack;
    })
  }

  return filteredMaterials;
}

const generateMaterialCards = (materials) => {
  let materialCardTemplate = '';

  if (materials[0].data.type === 'book') {
    materialCardTemplate = createBookCards(materials);
  }else {
    materialCardTemplate = createDocOrCourseCards(materials);
  }

  return materialCardTemplate;
} 

const createBookCards = (books) => {
  let bookCards = '';
  books.forEach(book => {
    bookCards += `<li class="mdc-image-list__item" data-id="${book.id}">
    <div class="mdc-layout-grid__cell mdc-card mdc-card--outline">
      <div class="mdc-card__primary-action">
      <div class="card__content">
        <h2 class="card__title mdc-typography--headline6">${book.data.title}</h2>
        <h6 class="card__subtitle card__subtitle--with-icon card__subtitle--no-spacing mdc-typography--body2">${book.data.author}</h6>
        <span class="mdc-typography--caption level">${book.data.level}</span>
      </div>
      <div class="mdc-card__media">
        <img src="./img/material-card-image.png" alt="">
      </div>
      <div class="card__content">
        <span class="mdc-typography--overline availability">availability: ${book.data.availability}</span>
        <div class="mdc-typography--caption description">
          ${book.data.description}
        </div>
      </div>
      </div>
      <div class="mdc-card__actions">
        <div class="mdc-card__action-buttons">
          <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" href="${book.data.link}">
            launch
          </button>
        </div>
        <div class="mdc-card__action-icons">
          <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon edit-button" title="edit" >edit</button>
          <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon delete-button" title="delete">delete</button>
        </div>
      </div>
    </div>
    </li>`
  })
  return bookCards;
}
// since the documents and courses have same card format
const createDocOrCourseCards = (docs) => {
  let docCards = '';
  docs.forEach(doc => {
    docCards += `<li class="mdc-image-list__item" data-id="${doc.id}">
    <div class="mdc-layout-grid__cell mdc-card mdc-card--outline">
      <div class="mdc-card__primary-action">
      <div class="card__content">
        <h2 class="card__title mdc-typography--headline6">${doc.data.title}</h2>
        <p class="mdc-typography--caption level">${doc.data.level}</p>
        <div class="mdc-typography--caption">
          ${doc.data.description}
        </div>
      </div>
      </div>
      <div class="mdc-card__actions">
        <div class="mdc-card__action-buttons">
          <a class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon edit-button" href="${doc.data.link}" target="_blank" rel="noreferer">
            launch
          </a>
        </div>
        <div class="mdc-card__action-icons">
          <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon edit-button" title="edit" >edit</button>
          <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon delete-button" title="delete">delete</button>
        </div>
      </div>
    </div>
    </li>`;
  })
  return docCards;
}

const renderContent = (content) => {
  // get the parent
  const cardsParent = document.getElementById('card-list');

  // render material into parent
  cardsParent.innerHTML = content;
}

const renderError = (message) => {
  const template = `
  <div class="message-wrapper">
    <h1 class="message-icon">:(</h1>
    <h2 class="message-text">${message}</h2>
  </div>
  `;

  renderContent(template)
}
const renderSpinner = () => {
  const template = `
      <div class="spinner-wrapper">
      <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
      </svg>
    </div>
  `;

  renderContent(template);
}
const changeStateOfPresentedMaterial = (state, value) => {
  // change state 
  stateOfMaterialsToPresent[state] = value;
  //and re-render items 
  handleMaterialsRendering(stateOfMaterialsToPresent);
}

// handle tab activations
const handleTabActivate = (evt) => {
  // if the switched tab is for the material category
  if(evt.target.dataset.tabBarId === "material-categories"){
    const tabs = evt.target.querySelectorAll('.mdc-tab');
    const tabID = evt.detail.index;

    const category = tabs[tabID].dataset.value;
    changeStateOfPresentedMaterial('category', category)
  }
}

// handles all changes in stack
const handleSelectChange = () => {
  const selectedStack = selectMenu.value;

  changeStateOfPresentedMaterial('stack', selectedStack);
}

// event listeners
// when the page first loads
document.addEventListener('DOMContentLoaded', () => handleMaterialsRendering(stateOfMaterialsToPresent));

// whenever the tab is switched
tabBar.listen('MDCTabBar:activated', handleTabActivate);

// whenever the select value changes
selectMenu.listen('MDCSelect:change', handleSelectChange)