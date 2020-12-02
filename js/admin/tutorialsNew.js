// INSTANTIATION OF ALL COMPONENTS
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
const updateButtons = document.querySelectorAll('.updateButton');

// FIREBASE
// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

// CONSTANTS
//states
const stateOfMaterialsToPresent = {
  stack: 'all',
  category: 'book'
}
const cardIDs = {
  editted:'',
  deleted: ''
}

// FUNCTIONS
const getMaterials = async () => {
  // get the snapshots from firestore
  const snapshots = await db.collection('materials').get();

  return snapshots
}

const handleMaterialsRendering = (state) => {
  // render the spinner in while page fetches data from firestore
  renderSpinner();

  // get materials from firebase firestore
  getMaterials()
  .then(snapshots => {
    let materials = [];
    snapshots.forEach(snapshot => {
      const material = {
        id: snapshot.id,
        data: snapshot.data()
      }
      // push all the materials gotten to the materials list
      materials.push(material);
    })
    
    // filter materials
    const filteredMaterials = getFilteredMaterial(state, materials);

    // checking if there are materials present for the selected state
    if (filteredMaterials[0]) {
      // creating material cards
      const materialCards = generateMaterialCards(filteredMaterials)

      // render the material
      renderContent(materialCards);
    }else {
      // if there's no material for a particular selection
      throw new Error('no material present for this category selected')
    }
  })
  .catch(err => renderError(err));
}
const getFilteredMaterial = (state, materials) => {
  let filteredMaterials = [];
  
  // if the stack selected for render is all, then filter by material category only
  if (state.stack === 'all') {
    filteredMaterials = materials.filter(material => {
      return state.category === material.data.type;
    })
  }else {
    // else, filter by stack and material category
    filteredMaterials = materials.filter(material => {
      return state.category === material.data.type && state.stack === material.data.stack;
    })
  }

  return filteredMaterials;
}

const generateMaterialCards = (materials) => {
  let materialCardTemplate = '';

  // if the first material's type is book (def they all have same category after filter)
  if (materials[0].data.type === 'book') {
    materialCardTemplate = createBookCards(materials);
  }else {
    // if it's not a book
    materialCardTemplate = createDocOrCourseCards(materials);
  }

  return materialCardTemplate;
} 

const createBookCards = (books) => {
  let bookCards = '';
  books.forEach(book => {
    bookCards += `<li class="mdc-image-list__item material-item" data-id="${book.id}" data-stack=${book.data.stack}>
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
    docCards += `<li class="mdc-image-list__item material-item" data-id="${doc.id}" data-stack=${doc.data.stack}>
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
  const errorTemplate = `
  <div class="message-wrapper">
    <h1 class="message-icon">:(</h1>
    <h2 class="message-text">${message}</h2>
  </div>
  `;

  renderContent(errorTemplate)
}
const renderSpinner = () => {
  const spinnerTemplate = `
      <div class="spinner-wrapper">
      <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
      </svg>
    </div>
  `;

  renderContent(spinnerTemplate);
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
  // reset dropdowns
  for (menu in matSelectMenus){
    matSelectMenus[menu].foundation.setSelectedIndex(-1);
  }
}

//handle click of card list and delegate to the action buttons
const handleCardlistClick = e => {
  //get the targeted button
  const button = e.target.closest('button');
  if (button === null) return

  // get the id of the clicked material item
  const materialID = button.closest('.material-item').dataset.id;

  if (button.title === 'edit') {
    const action = 'edit';
    const category = stateOfMaterialsToPresent.category;
  
    //get the modal
    const modal = getModal(category);

    //get the card details
    getCardDetails(materialID)
    .then(material => {
      //open the modal
      openModal(modal, action, category);

      //pass the card detail into modal text field
      handleFillModalField(modal, material, category);

      // update the edit id
      cardIDs.editted = material.id;
    })
  }else if (button.title === 'delete') {
    // save the id in the variable property
    cardIDs.deleted = materialID;

    // open the delete modal
    dialogInstances['delete-material'].open();
  }
}

const getCardDetails = async (materialID) => {
  // getting data from firestore
  const data = await db.collection('materials').doc(materialID).get();
  // get material details
  const material = {...data.data(), id: data.id}
  
  return material;
}

const getModal = (category) => {
  let modal;

  if (category === 'book') {
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

  // inject values into them
  modalActionHeader.textContent = action;
  modalActionButton.textContent = action;
  modalActionButton.closest('button').title = action;
  modalCategoryHeader.textContent = category;

  modal.open();  
}

const handleFillModalField = (modal, material, category) => {
  if (category === 'book') {
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


// firebase add, edit actions
const handleFirestoreAddOrEditAction = (e) => {
  // get the clicked btn
  const btn = e.target.closest('.updateButton');
  // get the action saved in the title attribute
  const action = btn.title;

  let material
  // if the action is add or edit
  if (action === 'add' || action === 'edit') {
    // get the form 
    const form = btn.parentElement.previousElementSibling;
    
    // get all the form values
    material = getFormValues(form);

    // check if inputted details are valid
    if (!isValid(material)) return;
    
    // disable the action btn so it can't be pressed
    btn.disabled = true;
    
  }
  
  // get the modal so it can be closed later
  const modal = getModal(stateOfMaterialsToPresent.category);

  let addAction, editAction, deleteAction;

  // carry out respective actions in firestore
  if (action === 'add') {
    addAction = addMaterialToFirestore(material);
  }else if( action === 'edit' ) {
    editAction = editMaterialInFirestore(material, cardIDs.editted);
  }else if (action === 'delete') {
    deleteAction = deleteMaterialFromFirestore(cardIDs.deleted)
  }

  // if any of the listed promises is resolved, then  
  Promise.any([addAction, editAction, deleteAction])
  .then(() => {
    // enable the btn
    btn.disabled = false;
    // close the modal
    modal.close();
    // rerender the material card
    handleMaterialsRendering(stateOfMaterialsToPresent);
  })
  .catch(err => console.log(err));
}
const addMaterialToFirestore = (material) => {
  return db.collection('materials').add(material)
}
const editMaterialInFirestore = (material, id) => {
  return db.collection('materials').doc(id).update(material)
}
const deleteMaterialFromFirestore = (id) => {
  return db.collection('materials').doc(id).delete();
}

const isValid = (material) => {
  // loop through each if the properties and see if the have a defined or valid first item
  for (detail in material){
    if (!material[detail][0]) {
      return false;
    }
  }
  
  return true;
}
const getFormValues = (form) => {
  const material = {};
  // get form values
  material.title = form.querySelector('.material-title').value;
  material.link = form.querySelector('.material-link').value;
  material.description = form.querySelector('.material-description').value
  material.type = stateOfMaterialsToPresent.category;

  // for books specifically
  if (material.type === 'book') {
    
    material.level = bookSelectMenus['book-modal-level-select'].value;
    material.stack = bookSelectMenus['book-modal-stack-select'].value;
  
    material.author = form.querySelector('.material-author').value;
    material.availability = [];

    for (checkbox in bookAvailabilityCheckboxes) {
      if (bookAvailabilityCheckboxes[checkbox].checked === true) {
        material.availability.push(checkbox);
      }
    }
  }else {
    // for the docs and courses
    material.level = matSelectMenus['mat-modal-level-select'].value;
    material.stack = matSelectMenus['mat-modal-stack-select'].value;
  }

  return material;
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

// when the edit or add action button is pressed
updateButtons.forEach(btn => {
  btn.addEventListener('click', handleFirestoreAddOrEditAction);
})