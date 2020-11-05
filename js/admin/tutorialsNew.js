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

// constants
//states
const stateOfMaterialsToPresent = {
  stack: 'all',
  category: 'books'
}
//all the materials
const allMaterials = {
  web: {
    books: Array.from({ length: 3}, (_) => ({
      title: 'Eloquent Javascript',
      author: 'Marijn Haverbeke',
      description: 'This is a book about JavaScript, programming, and the wonders of the digital.',
      availability: 'online,ebook,printed',
      stack: 'web'
    })),
    documentations: Array.from({ length: 3}, (_) => ({
      title:'Bootstrap',
      description: 'Get started with Bootstrap, the world’s most popular framework for building responsive, mobile-first sites.',
      stack: 'web'
    })),
    courses: Array.from({ length: 3}, (_) => ({
      title: 'Introduction to Web Development',
      description: 'This course is designed to start you on a path toward future studies in web development and design, no matter how little experience or technical knowledge you currently have. ',
      stack: 'web'
    }))
  },
  mobile: {
    books:Array.from({ length: 3}, (_) => ({
      title: 'Head First Android Development',
        author: 'Dawn Griffiths',
        description: 'If you have an idea for a killer Android app, this fully revised and updated edition will help you build your first working application in a jiffy.',
        availability: 'online,ebook,printed',
        stack: 'mobile'
    })),
    documentations: Array.from({ length: 3}, (_) => ({
      title: 'Flutter',
      description: 'Apps take flight with Flutter',
      stack: 'mobile'
    })),
    courses: Array.from({ length: 3}, (_) => ({
      title: 'Kotlin for Java Developers',
      description: 'The Kotlin programming language is a modern language that gives you more power for your everyday tasks.',
      stack: 'mobile'
    }))
  },
  machineLearning: {
    books:Array.from({ length: 3}, (_) => ({
      title: 'Python Machine Learning',
      author: 'Sebastian Raschka, Vahid Mirjalili',
      description: 'Applied machine learning with a solid foundation in theory. Revised and expanded for TensorFlow 2, GANs, and reinforcement learning.',
      availability: 'printed',
      stack: 'machineLearning'
    })),
    documentations: Array.from({ length: 3}, (_) => ({
      title: 'Keras',
      description: 'Keras is an API designed for human beings, not machines.',
      stack: 'machineLearning'

    })),
    courses: Array.from({ length: 3}, (_) => ({
      title: 'Data Structures',
        description: 'A good algorithm usually comes together with a set of good data structures that allow the algorithm to manipulate the data efficiently.',
        stack: 'machineLearning'
    }))
  },
  cloud: {
    books:Array.from({ length: 3}, (_) => ({
      title: 'Cloud Computing',
      author: 'Ricardo Puttini, Thomas Erl, Zaigham Mahmood',
      description: 'Clouds are distributed technology platforms that leverage sophisticated technology innovations to provide highly scalable and resilient environments that can be remotely utilized by organizations in a multitude of powerful ways.',
      availability: 'online,ebook',
      stack: 'cloud'
    })),
    documentations: Array.from({ length: 3}, (_) => ({
      title: 'Google Cloud',
      description: 'Get started with Google Cloud',
      stack: 'cloud'
    })),
    courses: Array.from({ length: 3}, (_) => ({
      title: 'Google Cloud Platform Fundamentals',
      description: 'This course introduces you to important concepts and terminology for working with Google Cloud Platform (GCP).',
      stack: 'cloud'
    }))
  }
}
allMaterials.all = {
  books: [...allMaterials.web.books, ...allMaterials.mobile.books, ...allMaterials.machineLearning.books, ...allMaterials.cloud.books],
  documentations: [...allMaterials.web.documentations, ...allMaterials.mobile.documentations, ...allMaterials.machineLearning.documentations, ...allMaterials.cloud.documentations],
  courses: [...allMaterials.web.courses, ...allMaterials.mobile.courses, ...allMaterials.machineLearning.courses, ...allMaterials.cloud.courses]
}
//

// functions
const handleMaterialsRendering = (state, materials) => {
  // filter materials
  const filteredMaterials = getFilteredMaterial(state, materials);

  // create cards for the materials
  const materialCards = generateMaterialCards(state.category, filteredMaterials);

  // render material cards
  renderMaterials(materialCards);
}
const getFilteredMaterial = (state, generalMaterials) => {
  // get the materials for a particular stack
  const materialFilteredByStack = filterMaterial(state.stack, generalMaterials);

  // get a particular category of material
  const materialFurtherFilteredByCategory = filterMaterial(state.category, materialFilteredByStack);

  return materialFurtherFilteredByCategory;
}

const filterMaterial = (criteria, generalMaterials) => {
  return generalMaterials[criteria];
}

const generateMaterialCards = (materialCategory, materials) => {
  return materialCategory === 'books' ? createBookCards(materials) : createDocOrCourseCards(materials);
} 

const createBookCards = (books) => {
  let bookCards = '';
  books.forEach(book => {
    bookCards += `<li class="mdc-image-list__item" data-stack=${book.stack}>
    <div class="mdc-layout-grid__cell mdc-card mdc-card--outline">
      <div class="mdc-card__primary-action">
      <div class="card__content">
        <h2 class="card__title title mdc-typography--headline6">${book.title}</h2>
        <h6 class="author card__subtitle card__subtitle--with-icon card__subtitle--no-spacing mdc-typography--body2">${book.author}</h6>
        <span class="mdc-typography--caption level">Beginner</span>
      </div>
      <div class="mdc-card__media">
        <img src="./img/material-card-image.png" alt="">
      </div>
      <div class="card__content">
        <span class="mdc-typography--overline small-text"> availability: 
          <span class="availability">
          ${book.availability}
          </span>
        </span>
        <div class="mdc-typography--caption description">
          ${book.description}
        </div>
      </div>
      </div>
      <div class="mdc-card__actions">
        <div class="mdc-card__action-buttons">
          <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon">
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
    docCards += `<li class="mdc-image-list__item" data-stack=${doc.stack}>
    <div class="mdc-layout-grid__cell mdc-card mdc-card--outline">
      <div class="mdc-card__primary-action">
      <div class="card__content">
        <h2 class="card__title mdc-typography--headline6 title">${doc.title}</h2>
        <p class="mdc-typography--caption level">Beginner</p>
        <div class="mdc-typography--caption description">
          ${doc.description}
        </div>
      </div>
      </div>
      <div class="mdc-card__actions">
        <div class="mdc-card__action-buttons">
          <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon edit-button">
            launch
          </button>
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

const renderMaterials = (materials) => {
  // get the parent
  const cardsParent = document.getElementById('card-list');

  // render material into parent
  cardsParent.innerHTML = materials;
}

const changeStateOfPresentedMaterial = (state, value) => {
  // change state 
  stateOfMaterialsToPresent[state] = value;
  //and re-render items 
  handleMaterialsRendering(stateOfMaterialsToPresent, allMaterials);
}

// handle tab activations
const handleTabActivate = (evt) => {
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
document.addEventListener('DOMContentLoaded', () => handleMaterialsRendering(stateOfMaterialsToPresent, allMaterials));

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