// instantiation of all components
// select menu
const selectMenus = document.querySelectorAll('.mdc-select');
const bookSelectMenus = {};
const matSelectMenus = {};
const OtherMenuInstances = {};
selectMenus.forEach(selectMenu => {

  if (selectMenu.dataset.selectType === 'book-modal-select') {
    const selectID = selectMenu.dataset.selectId;
    bookSelectMenus[selectID] = new mdc.select.MDCSelect(selectMenu);
  } else 
  if (selectMenu.dataset.selectType === 'mat-modal-select') {
    const selectID = selectMenu.dataset.selectId;
    matSelectMenus[selectID] = new mdc.select.MDCSelect(selectMenu);
  }else {
    const selectID = selectMenu.dataset.selectId;
    OtherMenuInstances[selectID] = new mdc.select.MDCSelect(selectMenu);
  }

})

// tabbar
const tabBar = new mdc.tabBar.MDCTabBar(document.querySelector('.mdc-tab-bar'));

// ripples
const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action, .mdc-fab';
const elements = document.querySelectorAll(selector);

elements.forEach(element => {
  mdc.ripple.MDCRipple.attachTo(element);
})

//dialog modals
const dialogs = document.querySelectorAll('.mdc-dialog');
const dialogInstances = {};
dialogs.forEach(dialog => {
  const modalID = dialog.dataset.modalId;
  dialogInstances[modalID] = new mdc.dialog.MDCDialog(dialog);
})

//text fields
const textFields = document.querySelectorAll('.mdc-text-field');
for (const textField of textFields) {
  mdc.textField.MDCTextField.attachTo(textField);
}

// checkboxes
const formFields = document.querySelectorAll('.mdc-form-field');
const bookAvailabilityCheckboxes = {};
formFields.forEach(formField => {
  const checkbox = formField.querySelector('.mdc-checkbox');
  const checkInput = checkbox.querySelector('input');

  if (checkInput.name === 'book-availability') {
    bookAvailabilityCheckboxes[checkInput.value] = new mdc.checkbox.MDCCheckbox(checkbox);
  }
})

// END OF INSTANTIATION OF COMPONENT
//UI ELEMENTS
const addBtn = document.getElementById('addButton');
const cardList = document.getElementById('card-list');

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
//states
const stateOfMaterialsToPresent = {
  stack: 'all',
  category: 'book'
}
//


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
    bookCards += `<li class="mdc-image-list__item" data-id="${book.id}" data-stack=${book.stack}>
    <div class="mdc-layout-grid__cell mdc-card mdc-card--outline">
      <div class="mdc-card__primary-action">
      <div class="card__content">
        <h2 class="card__title mdc-typography--headline6">${book.data.title}</h2>
        <h6 class="author card__subtitle card__subtitle--with-icon card__subtitle--no-spacing mdc-typography--body2">${book.data.author}</h6>
        <span class="mdc-typography--caption level">${book.data.level}</span>
      </div>
      <div class="mdc-card__media">
        <img src="./img/material-card-image.png" alt="">
      </div>
      <div class="card__content">
        <span class="mdc-typography--overline small-text"> availability: 
          <span class="availability">
          ${book.data.availability}
          </span>
        </span>
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
    docCards += `<li class="mdc-image-list__item" data-id="${doc.id}" data-stack=${doc.stack}>
    <div class="mdc-layout-grid__cell mdc-card mdc-card--outline">
      <div class="mdc-card__primary-action">
      <div class="card__content">
        <h2 class="card__title mdc-typography--headline6 title">${doc.data.title}</h2>
        <p class="mdc-typography--caption level">${doc.data.level}</p>
        <div class="mdc-typography--caption description">
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
const handleStackSelectChange = () => {
  const selectedStack = OtherMenuInstances['stack-select'].value;

  changeStateOfPresentedMaterial('stack', selectedStack);
}

//handle opening of add modal
const handleAddModalOpening = () => {
  // set dialog action
  const action = 'add';
  const category = stateOfMaterialsToPresent.category;

  //get the modal
  const modal = getModal(category);

  //open modal
  openModal(modal,action, category);
}

const handleModalClosing = e => {
  const modal = e.target;
  const category = stateOfMaterialsToPresent.category;

  //reset textfields
  const textFields = modal.querySelectorAll('.modalInput');
  textFields.forEach(field => {
    field.value = '';
    field.parentElement.classList.remove('mdc-text-field--valid');
    field.parentElement.classList.remove('mdc-text-field--invalid');
    field.parentElement.classList.remove('mdc-text-field--focused');
  })


  if (category === 'books') {
    handleBookModalClosing();
  } else {
    handleMaterialModalClosing();   
  } 
}

const handleBookModalClosing = () => {
  //reset checkboxes
  for (checkbox in bookAvailabilityCheckboxes) {
    bookAvailabilityCheckboxes[checkbox].checked = false;
  }

  //reset dropdowns
  for (menu in bookSelectMenus){
    bookSelectMenus[menu].foundation.setSelectedIndex(-1);
  }
}

const handleMaterialModalClosing = () => {
  for (menu in matSelectMenus){
    matSelectMenus[menu].foundation.setSelectedIndex(-1);
  }
}
//handle click of card list and delegate to the action buttons
const handleCardlistClick = e => {
  //get the targeted button
  const button = e.target.closest('button');

  if (button === null) return
  const materialCard = button.parentElement.parentElement.parentElement.parentElement;

  if (button.title === 'edit') {
    const action = 'edit';
    const category = stateOfMaterialsToPresent.category;
    //get the card details
    const material = getCardDetails(materialCard, category);

    //get the modal
    const modal = getModal(category);

    //open the modal
    openModal(modal, action, category)

    //pass the card detail into modal text field
    handleFillModalField(modal, material, category);
  }
}

const getCardDetails = (materialCard, category) => {
  const material = {};

  material.title = materialCard.querySelector('.title').textContent.trim();
  material.level= materialCard.querySelector('.level').textContent.trim();
  material.description= materialCard.querySelector('.description').textContent.trim();
  material.stack = materialCard.dataset.stack;
  
  if (category === 'books') {
    material.availability= materialCard.querySelector('.availability').textContent.trim().split(',');
    material.author= materialCard.querySelector('.author').textContent.trim();
  }
  return material;
}

const getModal = (category) => {
  let modal;

  if (category === 'books') {
    modal = dialogInstances['book-form'];
  }else {
    modal = dialogInstances['docs-courses-form'];
  }

  return modal;
}

const openModal = (modal, action, category) => {
  //set up for the modal
  //get the required UI element
  const modalActionHeader = modal.root.querySelectorAll('.dialog-mode')[0];
  const modalActionButton = modal.root.querySelectorAll('.dialog-mode')[1];
  const modalCategoryHeader = modal.root.querySelector('.category');

  modalActionHeader.textContent = action;
  modalActionButton.textContent = action;
  modalCategoryHeader.textContent = category;

  modal.open();  
}

const handleFillModalField = (modal, material, category) => {
  if (category === 'books') {
    fillBookModal(modal, material);
  }else {
    fillMaterialModal(modal, material);
  }
}

const fillBookModal = (modal, material) => {
  //get the UI elements
  const titleUI = modal.root.querySelector('#bookTitle');
  const authorUI = modal.root.querySelector('#bookAuthor');
  const linkUI = modal.root.querySelector('#bookLink');
  const descriptionUI = modal.root.querySelector('#bookDesc');
  const availabilityUI = bookAvailabilityCheckboxes;
  const levelUI = bookSelectMenus['book-modal-level-select'];
  const stackUI = bookSelectMenus['book-modal-stack-select'];

  //fill the fields
  fillTextField(titleUI, material.title);
  fillTextField(authorUI, material.author)
  fillTextField(linkUI, material.link)
  fillTextField(descriptionUI, material.description);
  
  //checkboxes
  for (checkbox in availabilityUI) {
    if (material.availability.includes(checkbox)) {
      availabilityUI[checkbox].checked = true;
    }else {
      availabilityUI[checkbox].checked = false;
    }
  }

  //dropdowns
  fillDropdown(levelUI, material.level);
  fillDropdown(stackUI, material.stack);  
}
const fillMaterialModal = (modal, material) => {
  //get the UI elements
  const titleUI = modal.root.querySelector('#materialTitle');
  const linkUI = modal.root.querySelector('#materialLink');
  const descriptionUI = modal.root.querySelector('#materialDesc');
  const levelUI = matSelectMenus['mat-modal-level-select'];
  const stackUI = matSelectMenus['mat-modal-stack-select'];

  //fill the fields
  fillTextField(titleUI, material.title);
  fillTextField(linkUI, material.link)
  fillTextField(descriptionUI, material.description);

  //dropdowns
  fillDropdown(levelUI, material.level);
  fillDropdown(stackUI, material.stack);  
}

const fillTextField = (textfield, value) => {
  //if the value of passed is undefined, make it an empty string
  if (value === undefined) {
    value = '';
  }else {
    //else focus the text field
    textfield.focus();
  }
  //fill the text field
  textfield.value = value;
}
const fillDropdown = (dropdown, value) => {
  //loop through the dropdown list item and check for the items that match
  dropdown.menu.items.forEach((item, index) => {
    if (item.dataset.value === value.toLowerCase()) {
      dropdown.foundation.setSelectedIndex(index);
    }
  })
}

// event listeners
// when the page first loads
document.addEventListener('DOMContentLoaded', () => handleMaterialsRendering(stateOfMaterialsToPresent));

// whenever the tab is switched
tabBar.listen('MDCTabBar:activated', handleTabActivate);

// when ever a modal is closed
for (dialog in dialogInstances){
  dialogInstances[dialog].listen('MDCDialog:closing', handleModalClosing)
}

// whenever the stack select value changes
OtherMenuInstances['stack-select'].listen('MDCSelect:change', handleStackSelectChange)

// when the add material btn is clicked
addBtn.addEventListener('click',handleAddModalOpening);

// when the card list is clicked
cardList.addEventListener('click', handleCardlistClick);