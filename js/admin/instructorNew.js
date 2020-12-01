// Initializing Firebase

// // instatiation of all mdc components
// // text fields
const textFields = document.querySelectorAll('.mdc-text-field');
for (const textField of textFields) {
  mdc.textField.MDCTextField.attachTo(textField);
}

// cards
const selector = '.mdc-card__primary-action, .mdc-fab .mdc-button';

const ripples = [].forEach.call(document.querySelectorAll(selector), el => {
    mdc.ripple.MDCRipple.attachTo(el);
});


// dialogs
const dialogs = document.querySelectorAll('.mdc-dialog');
const dialogInstances = {};
dialogs.forEach(dialog => {
  const modalID = dialog.dataset.modalId;
  dialogInstances[modalID] = new mdc.dialog.MDCDialog(dialog);

})

// UI elements
// get edit btns
const cardList = document.getElementById('card-list');
// get add btns
const addBtn = document.getElementById('add-btn');

// get the modal dialog box
const modalDialog = document.getElementById('mdc-modal-dialog');

// get all modal inputs
const modalInputs = document.querySelectorAll('.modalInput');

// function to init event listeners
const initEvents = () => {
  // to the card list, then delegate to the edit and delete btn
  cardList.addEventListener("click", handleCardListClick);

  // to the add btn
  addBtn.addEventListener("click", handleAddInstructor);

  // to the page
  document.addEventListener("click", handleModalRemove);

  // events for the inputs
  modalInputs.forEach(modalInput => {
    modalInput.addEventListener('focus', handleFocus);
    modalInput.addEventListener('blur', handleBlur);
  })
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
  const modeIcon = document.getElementById('update-icon');

  modeIcon.className = 'fas fa-user-plus';
  
  // reveal the modal
  dialogInstances['instructor-form'].open()
  
  // change the text to the required action
  modeTextSpaces.forEach((space) => {
    space.textContent = action;
  })

  // fill the fields if required
  if (action.toLowerCase() === "edit") {
    fillModalFields(instructor);

    // change icon
    modeIcon.className = 'fas fa-user-edit';
  }
}

const fillModalFields = (instructor) => {
  // the input fields
  let nameUI = document.getElementById('instructorName'),
  roleUI = document.getElementById('instructorRole'),
  bioUI = document.getElementById('instructorBio'),
  githubUI = document.getElementById('githubID'),
  twitterUI = document.getElementById('twitterID');

  const fieldList = [githubUI, twitterUI, bioUI, roleUI, nameUI]


  // fill in the fields 
  nameUI.value = instructor.name;
  roleUI.value = instructor.role;
  bioUI.value = instructor.bio;
  githubUI.value = instructor.githubID;
  twitterUI.value = instructor.twitterID;

  // focus all fields
  fieldList.forEach(field => {
    field.focus();    
  })
}

// check the clicked item
const handleModalRemove = (e) => {
  const target = e.target;

  // if the target is any where around the document that is not the modal or it is the cancel btn, the modal should disappear;
  if (target.className === 'mdc-dialog__scrim') {
    hideModal();
  }

  if (target.closest('button') == null) {
    return;
  }
  else if (target.closest('button').id === 'close-btn') {
    hideModal();
  }
} 
const hideModal = () => {
  dialogInstances['instructor-form'].close()

  // modalDialog.classList.add("hide");
  // wipe the inputs clean
  modalInputs.forEach(modalInput => {
    modalInput.value ="";
    // remove all necessary class
    modalInput.parentElement.classList.remove('mdc-text-field--valid');
    modalInput.parentElement.classList.remove('mdc-text-field--invalid');
    modalInput.parentElement.classList.remove('mdc-text-field--focused');

    // remove the helper text
    modalInput.parentElement.nextElementSibling.textContent ='';
  })
}

// for the inputs
const handleFocus = (e) => {
  // get the parent and the helper text
  const parent = e.target.parentElement;
  const helperText = e.target.parentElement.nextElementSibling;

  console.log('focused',e.target, parent, helperText);

  // remove the valid and invalid classes from the parent
  parent.classList.remove('mdc-text-field--valid');
  parent.classList.remove('mdc-text-field--invalid');

  // add the focused class
  parent.classList.add('mdc-text-field--focused')

  // remove the helper text content if needed
}

const handleBlur = (e) => {
  // get the parent and the helper text
  const parent = e.target.parentElement;
  const helperText = e.target.parentElement.nextElementSibling;
  
  console.log('blurred', e.target, parent, helperText);
  // check for validity of the input
  if (e.target.checkValidity()) {
    // success
    parent.classList.add('mdc-text-field--valid');
    helperText.textContent = '';
  }else {
    // failure
    parent.classList.add('mdc-text-field--invalid');
    helperText.textContent = 'Enter a valid input';
  }
}

// run all event listeners
initEvents();


// To add Spinner before loading
var spinner;
function myfuction(){
  spinner = setTimeout(showPage, 3000);
}
function showPage(){
  document.getElementById('spinner').style.display ="none"
  document.querySelector('.spinner-out').style.display = "block"
}

myfuction();

// INIT Firebase
var database = firebase.firestore();
const addInstructor = document.getElementById('updateButton')

 
 let nameInstructor = document.getElementById('instructorName')
 let roleInstructor = document.getElementById('instructorRole')
 let description = document.getElementById('instructorBio')
 let twitterid = document.getElementById('twitterID')
 let githubid = document.getElementById('githubID')
 

 database.settings({ timestampsInSnapshots: true});
 var storage = firebase.storage();
 var storageRef = storage.ref()

 const db = database.collection("instructors")


addInstructor.addEventListener('click', function(e){
    e.preventDefault();


    let nameInstructorValue   = nameInstructor.value;
    let roleInstructorValue    = roleInstructor.value;
    let descriptionValue    = description.value;
    let twitteridValue   = twitterid.value;
    let githubidValue    = githubid.value;

  
    
    // Access the database collection
    db.doc().set({
        name: nameInstructorValue,
        role: roleInstructorValue,
        bio: descriptionValue,
        twitterID:twitteridValue,
        githubID:githubidValue
    }).then(function(){
      window.location.reload()      
    })
    
});




database.collection('instructors').get().then((snapshot) =>
{
  snapshot.docs.forEach(doc =>
    {
      gotData(doc);
    })
})

function gotData (doc){
 addInstructor.setAttribute('data-id', doc.id)
  let name = doc.data().name
  let role= doc.data().role
  let bio = doc.data().bio
  let twitterID = doc.data().twitterID
  let githubID = doc.data().githubID

  let postData = document.querySelector('.mdc-image-list');
  postData.innerHTML += `<li class="mdc-image-list__item">
  <div class="mdc-layout-grid__cell mdc-card mdc-card--outline">
      <div class="mdc-card__primary-action">
      <div class="mdc-card__media">
          <div class="user-icon-container">
              <span class="material-icons user-icon">
                  person_outline
              </span>
          </div>
      </div>
  <div class="card__content">
          <h2 class="card__title mdc-typography--headline6">${name}</h2>
          <h6 class="card__subtitle card__subtitle--with-icon card__subtitle--no-spacing mdc-typography--subtitle2">${role}</h6>
          <p class="card__description card__text mdc-typography--body2">${bio}</p>
          <ul class="mdc-list mdc-list--two-line mdc-list--flush">
              <li class="mdc-list-item primary" tabindex="0">
                <span class="mdc-list-item__ripple"></span>
                <span class="mdc-list-item__text primary-item">
                  <span class="mdc-list-item__primary-text">Twitter ID</span>
                  <span class="mdc-list-item__secondary-text twitter twitterID">${twitterID}</span>
                </span>
              </li>
              <li class="mdc-list-item second">
                <span class="mdc-list-item__ripple"></span>
                <span class="mdc-list-item__text secondary">
                  <span class="mdc-list-item__primary-text">Github ID</span>
                  <span class="mdc-list-item__secondary-text githubID">${githubID}</span>
                </span>
              </li>
          </ul>
      </div>
      </div>
      <div class="mdc-card__actions">
        <div class="mdc-card__action-icons">
          <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon edit-button" title="edit" >edit</button>
          <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon delete-button" title="delete">delete</button>
        </div>
      </div>
  </div>
  </li>
  `
  }
