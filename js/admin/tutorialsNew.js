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

// constants
const stateOfMaterialsToPresent = {
  stack: 'all',
  category: 'books'
}
//all the materials
const allMaterials = {
  all:{
    books: [
      {
        title: 'Eloquent Javascript',
        author: 'Marijn Haverbeke',
        description: 'This is a book about JavaScript, programming, and the wonders of the digital.',
        availability: 'Online, E-book,Printed'
      },{
        title: 'Eloquent Javascript',
        author: 'Marijn Haverbeke',
        description: 'This is a book about JavaScript, programming, and the wonders of the digital.',
        availability: 'Online, E-book, Printed'
      },{
        title: 'Eloquent Javascript',
        author: 'Marijn Haverbeke',
        description: 'This is a book about JavaScript, programming, and the wonders of the digital.',
        availability: 'Online, E-book, Printed'
      },{
        title: 'Head First Android Development',
        author: 'Dawn Griffiths',
        description: 'If you have an idea for a killer Android app, this fully revised and updated edition will help you build your first working application in a jiffy.',
        availability: 'Online, E-book, Printed'
      },{
        title: 'Head First Android Development',
        author: 'Dawn Griffiths',
        description: 'If you have an idea for a killer Android app, this fully revised and updated edition will help you build your first working application in a jiffy.',
        availability: 'Online, E-book, Printed'
      },{
        title: 'Head First Android Development',
        author: 'Dawn Griffiths',
        description: 'If you have an idea for a killer Android app, this fully revised and updated edition will help you build your first working application in a jiffy.',
        availability: 'Online, E-book, Printed'
      },{
        title: 'Python Machine Learning',
        author: 'Sebastian Raschka, Vahid Mirjalili',
        description: 'Applied machine learning with a solid foundation in theory. Revised and expanded for TensorFlow 2, GANs, and reinforcement learning.',
        availability: 'Printed'
      },{
        title: 'Cloud Computing',
        author: 'Ricardo Puttini, Thomas Erl, Zaigham Mahmood',
        description: 'Clouds are distributed technology platforms that leverage sophisticated technology innovations to provide highly scalable and resilient environments that can be remotely utilized by organizations in a multitude of powerful ways.',
        availability: 'Online, E-book'
      },{
        title: 'Cloud Computing',
        author: 'Ricardo Puttini, Thomas Erl, Zaigham Mahmood',
        description: 'Clouds are distributed technology platforms that leverage sophisticated technology innovations to provide highly scalable and resilient environments that can be remotely utilized by organizations in a multitude of powerful ways.',
        availability: 'Online, E-book'
      },{
        title: 'Cloud Computing',
        author: 'Ricardo Puttini, Thomas Erl, Zaigham Mahmood',
        description: 'Clouds are distributed technology platforms that leverage sophisticated technology innovations to provide highly scalable and resilient environments that can be remotely utilized by organizations in a multitude of powerful ways.',
        availability: 'Online, E-book'
      }
    ],
    documentations: [
      {
        title:'Bootstrap',
        description: 'Get started with Bootstrap, the world’s most popular framework for building responsive, mobile-first sites.',
      },{
        title:'Bootstrap',
        description: 'Get started with Bootstrap, the world’s most popular framework for building responsive, mobile-first sites.',
      },{
        title:'Bootstrap',
        description: 'Get started with Bootstrap, the world’s most popular framework for building responsive, mobile-first sites.',
      },{
        title: 'Flutter',
        description: 'Apps take flight with Flutter'
      },{
        title: 'Flutter',
        description: 'Apps take flight with Flutter'
      },{
        title: 'Flutter',
        description: 'Apps take flight with Flutter'
      },{
        title: 'Keras',
        description: 'Keras is an API designed for human beings, not machines.'
      },{
        title: 'Keras',
        description: 'Keras is an API designed for human beings, not machines.'
      },{
        title: 'Keras',
        description: 'Keras is an API designed for human beings, not machines.'
      },{
        title: 'Google Cloud',
        description: 'Get started with Google Cloud'
      },{
        title: 'Google Cloud',
        description: 'Get started with Google Cloud'
      },{
        title: 'Google Cloud',
        description: 'Get started with Google Cloud'
      }
    ],
    courses: [
      {
        title: 'Introduction to Web Development',
        description: 'This course is designed to start you on a path toward future studies in web development and design, no matter how little experience or technical knowledge you currently have. '
      },{
        title: 'Introduction to Web Development',
        description: 'This course is designed to start you on a path toward future studies in web development and design, no matter how little experience or technical knowledge you currently have. '
      },{
        title: 'Introduction to Web Development',
        description: 'This course is designed to start you on a path toward future studies in web development and design, no matter how little experience or technical knowledge you currently have. '
      },{
        title: 'Kotlin for Java Developers',
        description: 'The Kotlin programming language is a modern language that gives you more power for your everyday tasks.'
      },{
        title: 'Kotlin for Java Developers',
        description: 'The Kotlin programming language is a modern language that gives you more power for your everyday tasks.'
      },{
        title: 'Data Structures',
        description: 'A good algorithm usually comes together with a set of good data structures that allow the algorithm to manipulate the data efficiently.'
      },{
        title: 'Google Cloud Platform Fundamentals',
        description: 'This course introduces you to important concepts and terminology for working with Google Cloud Platform (GCP).'
      }
    ]
  },
  web: {
    books: [
      {
        title: 'Eloquent Javascript',
        author: 'Marijn Haverbeke',
        description: 'This is a book about JavaScript, programming, and the wonders of the digital.',
        availability: 'Online, E-book, Printed'
      },{
        title: 'Eloquent Javascript',
        author: 'Marijn Haverbeke',
        description: 'This is a book about JavaScript, programming, and the wonders of the digital.',
        availability: 'Online, E-book, Printed'
      },{
        title: 'Eloquent Javascript',
        author: 'Marijn Haverbeke',
        description: 'This is a book about JavaScript, programming, and the wonders of the digital.',
        availability: 'Online, E-book, Printed'
      }
    ],
    documentations: [
      {
        title:'Bootstrap',
        description: 'Get started with Bootstrap, the world’s most popular framework for building responsive, mobile-first sites.',
      },{
        title:'Bootstrap',
        description: 'Get started with Bootstrap, the world’s most popular framework for building responsive, mobile-first sites.',
      },{
        title:'Bootstrap',
        description: 'Get started with Bootstrap, the world’s most popular framework for building responsive, mobile-first sites.',
      }
    ],
    courses: [
      {
        title: 'Introduction to Web Development',
        description: 'This course is designed to start you on a path toward future studies in web development and design, no matter how little experience or technical knowledge you currently have. '
      },{
        title: 'Introduction to Web Development',
        description: 'This course is designed to start you on a path toward future studies in web development and design, no matter how little experience or technical knowledge you currently have. '
      },{
        title: 'Introduction to Web Development',
        description: 'This course is designed to start you on a path toward future studies in web development and design, no matter how little experience or technical knowledge you currently have. '
      }
    ]
  },
  mobile: {
    books: [
      {
        title: 'Head First Android Development',
        author: 'Dawn Griffiths',
        description: 'If you have an idea for a killer Android app, this fully revised and updated edition will help you build your first working application in a jiffy.',
        availability: 'Online, E-book, Printed'
      },{
        title: 'Head First Android Development',
        author: 'Dawn Griffiths',
        description: 'If you have an idea for a killer Android app, this fully revised and updated edition will help you build your first working application in a jiffy.',
        availability: 'Online, E-book, Printed'
      },{
        title: 'Head First Android Development',
        author: 'Dawn Griffiths',
        description: 'If you have an idea for a killer Android app, this fully revised and updated edition will help you build your first working application in a jiffy.',
        availability: 'Online, E-book, Printed'
      }
    ],
    documentations: [
      {
        title: 'Flutter',
        description: 'Apps take flight with Flutter'
      },{
        title: 'Flutter',
        description: 'Apps take flight with Flutter'
      },{
        title: 'Flutter',
        description: 'Apps take flight with Flutter'
      }
    ],
    courses: [
      {
        title: 'Kotlin for Java Developers',
        description: 'The Kotlin programming language is a modern language that gives you more power for your everyday tasks.'
      }
    ]
  },
  machineLearning: {
    books: [
      {
        title: 'Python Machine Learning',
        author: 'Sebastian Raschka, Vahid Mirjalili',
        description: 'Applied machine learning with a solid foundation in theory. Revised and expanded for TensorFlow 2, GANs, and reinforcement learning.',
        availability: 'Printed'
      }
    ],
    documentations: [
      {
        title: 'Keras',
        description: 'Keras is an API designed for human beings, not machines.'
      },{
        title: 'Keras',
        description: 'Keras is an API designed for human beings, not machines.'
      },{
        title: 'Keras',
        description: 'Keras is an API designed for human beings, not machines.'
      }
    ],
    courses: [
      {
        title: 'Data Structures',
        description: 'A good algorithm usually comes together with a set of good data structures that allow the algorithm to manipulate the data efficiently.'
      }
    ]
  },
  cloud: {
    books: [
      {
        title: 'Cloud Computing',
        author: 'Ricardo Puttini, Thomas Erl, Zaigham Mahmood',
        description: 'Clouds are distributed technology platforms that leverage sophisticated technology innovations to provide highly scalable and resilient environments that can be remotely utilized by organizations in a multitude of powerful ways.',
        availability: 'Online, E-book'
      },{
        title: 'Cloud Computing',
        author: 'Ricardo Puttini, Thomas Erl, Zaigham Mahmood',
        description: 'Clouds are distributed technology platforms that leverage sophisticated technology innovations to provide highly scalable and resilient environments that can be remotely utilized by organizations in a multitude of powerful ways.',
        availability: 'Online, E-book'
      },{
        title: 'Cloud Computing',
        author: 'Ricardo Puttini, Thomas Erl, Zaigham Mahmood',
        description: 'Clouds are distributed technology platforms that leverage sophisticated technology innovations to provide highly scalable and resilient environments that can be remotely utilized by organizations in a multitude of powerful ways.',
        availability: 'Online, E-book'
      }
    ],
    documentations: [
      {
        title: 'Google Cloud',
        description: 'Get started with Google Cloud'
      },{
        title: 'Google Cloud',
        description: 'Get started with Google Cloud'
      },{
        title: 'Google Cloud',
        description: 'Get started with Google Cloud'
      }
    ],
    courses: [
      {
        title: 'Google Cloud Platform Fundamentals',
        description: 'This course introduces you to important concepts and terminology for working with Google Cloud Platform (GCP).'
      }
    ]
  }
}

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
    bookCards += `<li class="mdc-image-list__item">
    <div class="mdc-layout-grid__cell mdc-card mdc-card--outline">
      <div class="mdc-card__primary-action">
      <div class="card__content">
        <h2 class="card__title mdc-typography--headline6">${book.title}</h2>
        <h6 class="card__subtitle card__subtitle--with-icon card__subtitle--no-spacing mdc-typography--body2">${book.author}</h6>
        <span class="mdc-typography--caption level">Beginner</span>
      </div>
      <div class="mdc-card__media">
        <img src="./img/material-card-image.png" alt="">
      </div>
      <div class="card__content">
        <span class="mdc-typography--overline availability">availability: ${book.availability}</span>
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
    docCards += `<li class="mdc-image-list__item">
    <div class="mdc-layout-grid__cell mdc-card mdc-card--outline">
      <div class="mdc-card__primary-action">
      <div class="card__content">
        <h2 class="card__title mdc-typography--headline6">${doc.title}</h2>
        <p class="mdc-typography--caption level">Beginner</p>
        <div class="mdc-typography--caption">
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
const handleSelectChange = () => {
  const selectedStack = selectMenu.value;

  changeStateOfPresentedMaterial('stack', selectedStack);
}

// event listeners
// when the page first loads
document.addEventListener('DOMContentLoaded', () => handleMaterialsRendering(stateOfMaterialsToPresent, allMaterials));

// whenever the tab is switched
tabBar.listen('MDCTabBar:activated', handleTabActivate);

// whenever the select value changes
selectMenu.listen('MDCSelect:change', handleSelectChange)