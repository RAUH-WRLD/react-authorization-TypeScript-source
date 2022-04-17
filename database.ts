import firebase from "firebase/compat/app";
import "firebase/compat/database";
const firebaseApp = firebase.initializeApp({
    apiKey: "-------",
    authDomain: "-------",
    databaseURL: "-------",
    projectId: "-------",
    storageBucket: "-------",
    messagingSenderId: "-------",
    appId: "-------",
});
export {firebase, firebaseApp};
