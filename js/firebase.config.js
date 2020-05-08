// This file needs to be in the repo for Github Actions
// and Netlify to successfully deploy the website along with the
// configuration
(function() {
  var config = {
    apiKey: "AIzaSyB6U0DJvc5eNtmOFd0q7YXXwdB5xl9zRvM",
    authDomain: "dscfuta-website.firebaseapp.com",
    databaseURL: "https://dscfuta-website.firebaseio.com",
    projectId: "dscfuta-website",
    storageBucket: "dscfuta-website.appspot.com",
    messagingSenderId: "345694247293"
  };
  firebase.initializeApp(config);
})();
