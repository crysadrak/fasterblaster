import firebase from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyAkMAp3UVD-umG386LAy-_h9e3pqdKa1QQ",
    authDomain: "mygame-d54af.firebaseapp.com",
    databaseURL: "https://mygame-d54af.firebaseio.com",
    projectId: "mygame-d54af",
    storageBucket: "mygame-d54af.appspot.com",
    messagingSenderId: "86014930819"
  };

export default firebase.initializeApp(config);