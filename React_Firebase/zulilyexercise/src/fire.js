import firebase from 'firebase'
 var config = {
    apiKey: "AIzaSyD2LgM1synWDVSYh9owKnr9BUYDcj9OcLY",
    authDomain: "zulilyexercise.firebaseapp.com",
    databaseURL: "https://zulilyexercise.firebaseio.com",
    projectId: "zulilyexercise",
    storageBucket: "zulilyexercise.appspot.com",
    messagingSenderId: "94861772912"
  };
  
var fire = firebase.initializeApp(config);

export const auth = firebase.auth();

export default fire;