import firebase from "firebase";
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyD8hITXN0TXA5j1fsm6Q9Y3zGkNVJEOFXY",
    authDomain: "crud-react-native-3721a.firebaseapp.com",
    projectId: "crud-react-native-3721a",
    storageBucket: "crud-react-native-3721a.appspot.com",
    messagingSenderId: "98480767793",
    appId: "1:98480767793:web:28cc353a64b62d642e6610"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
    firebase,
    db
}