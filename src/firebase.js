import firebase from "firebase/app";
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const auth= firebase.initializeApp( {
    apiKey: "AIzaSyBl06ExvR9NclLy6PZ-Hn-xbGlP4lV9sbI",
    authDomain: "funchat-60983.firebaseapp.com",
    projectId: "funchat-60983",
    storageBucket: "funchat-60983.appspot.com",
    messagingSenderId: "595938599743",
    appId: "1:595938599743:web:027554a398b6d2dda6e98a",
    measurementId: "G-6G7D867NHE"
  }).auth();