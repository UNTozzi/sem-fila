import firebase from 'firebase/app'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyABofI7uYHko6eFUDr51pgLhgAM5hK8oO8",
    authDomain: "semfila-5b58e.firebaseapp.com",
    databaseURL: "https://semfila-5b58e.firebaseio.com",
    projectId: "semfila-5b58e",
    storageBucket: "semfila-5b58e.appspot.com",
    messagingSenderId: "69885102445",
    appId: "1:69885102445:web:f8c59c20aa920ea3d47264",
    measurementId: "G-3R69T3156S"
};
let database;
if (!firebase.apps.length) {
    firebase.initializeApp(config);
    database = firebase.database()
} else database = firebase.database()


export default database;