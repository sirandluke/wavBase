/*
    Database_config.js
 */
const firebase = require('firebase');
//import firebase from "firebase";

// noinspection SpellCheckingInspection
const config = {
    apiKey: "AIzaSyCAsj0sKvrY1hqtXZYS_GbPyehKPXOzZ6Y",
    authDomain: "wavbasedb-9a679.firebaseapp.com",
    databaseURL: "https://wavbasedb-9a679.firebaseio.com/",
    projectId: "wavbasedb-9a679",
    storageBucket: "wavbasedb-9a679.appspot.com",  // Path to Firebase Storage.
    messagingSenderId: "707190956098",
    appId: "1:707190956098:web:88fa31bd96d13289c64ddb",
    measurementId: "G-C56V3L638G"
};

const db = firebase.initializeApp(config);
//const storage = db.storage();


//const storage = new gcloudStorage(config);

module.exports = db;
//export default db;
//export default storage;