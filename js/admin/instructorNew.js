// instatiation of all mdc components
// mdc.textField.MDCTextField.attachTo(document.querySelectorAll('.mdc-text-field'));



// UI elements
// get edit btns
const cardList = document.getElementById('card-list');
// get add btns
const addBtn = document.getElementById('add-btn');

// get the modal dialog box
const modalDialog = document.getElementById('mdc-modal-dialog');

// function to init event listeners
const initEvents = () => {
  // to the card list, then delegate to the edit and delete btn
  cardList.addEventListener("click", handleCardListClick);

  // to the add btn
  addBtn.addEventListener("click", handleAddInstructor);

  // to the page
  document.addEventListener("click", handleModalRemove);
}

// when the cards are clicked 
const handleCardListClick = (e) => {
  // console.log(e.target.closest('button'));
  const btn = e.target.closest('button');
  
  // if the element is null stop
  if (btn === null ) return;

  // check the btns title and carry out the operation required
  if (btn.title === 'edit') {
    const cardDetailSection = btn.parentElement.parentElement.previousElementSibling.children[1];

    // get the instructor's data from the card
    const instructor = extractCardDetail(cardDetailSection);

    // console.log(instructor);
    // open modal
    handleModalOpening('Edit', instructor);
  }else if (btn.title === 'delete' && confirm('You are about to remove the card')) {
    // console.log('nay')
    // get the card
    const card = btn.parentElement.parentElement.parentElement.parentElement;

    // remove it from
    card.remove();
  }
}

const extractCardDetail = (card) => {
  const instructor = {};

  // extracting the details
  instructor.name = card.querySelector('.card__title').textContent;
  instructor.role = card.querySelector('.card__subtitle').textContent;
  instructor.bio = card.querySelector('.card__description').textContent;
  instructor.githubID = card.querySelector('.githubID').textContent;
  instructor.twitterID = card.querySelector('.twitterID').textContent;

  return instructor;
}
// handle the add click
const handleAddInstructor = (e) => {
  handleModalOpening('Add');
}

const handleModalOpening = (action, instructor =  {
  name: '',
  role: '',
  bio: '',
  githubID: '',
  twitterID: ''
}) => {
  // getting all the required details
  // the header and btn texts
  const modeTextSpaces = document.querySelectorAll('.dialog-mode');
  
  // reveal the modal by removing the hide class
  modalDialog.classList.remove('hide');
  

  // change the text to the required action
  modeTextSpaces.forEach((space) => {
    space.textContent = action;
  })

  // fill the fields if required
  if (action.toLowerCase() === "edit") {
    fillModalFields(instructor);
  }
}

const fillModalFields = (instructor) => {

  // console.log("lol");
  // the input fields
  const nameUI = document.getElementById('instructorName'),
  roleUI = document.getElementById('instructorRole'),
  bioUI = document.getElementById('instructorBio'),
  githubUI = document.getElementById('githubID'),
  twitterUI = document.getElementById('twitterID');


  // fill in the fields 
  nameUI.value = instructor.name;
  roleUI.value = instructor.role;
  bioUI.value = instructor.bio;
  githubUI.value = instructor.githubID;
  twitterUI.value = instructor.twitterID;
}

// check the clicked item
const handleModalRemove = (e) => {
  const target = e.target;

  // if the target is any where around the document that is not the modal or it is the cancel btn, the modal should disappear;
  if (target.className === 'mdc-dialog__scrim') {
    modalDialog.classList.add("hide");
  }

  if (target.closest('button') == null) {
    return;
  }
  else if (target.closest('button').id === 'close-btn') {
    modalDialog.classList.add("hide");
  }
  // if it the update btn  
  else if (target.closest('button').id === 'updateButton') {
    // get the text as the mode
    console.log(target.textContent.trim())
  }
} 

// run all event listeners
initEvents();