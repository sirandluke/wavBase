/*
    FirebaseHandler.js
 */
import db from "./base.js";
import * as K from "../Constants.js";

/*** wavBase.users queries ***/

const ref = db.database().ref();

/**
 * Creates a data entry for new user
 * @param {element} username 
 * @param {element} password 
 * @param {element} email 
 * @param {element} first_name 
 * @param {element} last_name 
 */
export function createUser(username, password, email, first_name, last_name) {
    // Creates user id with email and password values
    db
    .auth()
    .createUserWithEmailAndPassword(
        email.value,
        password.value
    );

    // Sets child values for user id
    db.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.database().ref('users/' + user.uid).set({
                username: username.value,
                email: email.value,
                first_name: first_name.value,
                last_name: last_name.value,
                biography: K.empty,
                profile_picture: K.empty,
                followers: K.empty,
                following: K.empty,
            });
        }
    });
}

/**
 * Queries for user id based on email passed in
 * @param {string} email 
 * @param {function} callback
 */
export function getUserByEmail(email, callback) {
    try {
        let uid = "";

        // Sort children by email and query matching email; store in snapshot
        ref.child('users').orderByChild('email').equalTo(email).once("value", (snapshot) => {

            // Data entry in snapshot should contain table for this user
            snapshot.forEach((entry) => {
                uid = entry.key;
            });

            // Callback once finish processing snapshot data
            callback(uid);
        });
    } catch(error) {
        console.log(error.message);
    }
}

/**
 * Updates value for user based on parameters
 * @param {string} updatePath e.g. "users/uid/biography" to update the biography field of a user
 * @param {*} updateVal 
 * @param {function} callback 
 */
export function updateUser(updatePath, updateVal, callback) { 
    try {
        // Specifies where to update and what value to use
        var updates = {};
        updates[updatePath] = updateVal;

        // Writes to the nodes specified
        ref.update(updates);

        // Passes updated value through callback
        ref.child(updatePath).once("value", (snapshot) => {
            callback(snapshot.val());
        });
    } catch(error) {
        console.log(error.message);
    }
}

// Delete user a user from the database. (????)
function deleteUser(id) { }

/*** wavBase.repositories queries ***/
// Insert a new repository into the database.
function insertRepository(id, user_id, tags_id, name, bpm, key, description) {
    // These values will later be specified by the user / system.
    let snapshots = "";
    let repo_likes = "";
    let comments = "";
    let thumbnail = "";

    // Put time stamp in database: upload_date: firebase.firestore.FieldValue.serverTimestamp();
}

// Update a repository's fields in the database.
function updateRepository() { }

// Delete a Repository.
function deleteRepository() { }

/*** wavBase.snapshots queries ***/

// Insert a new snapshot into the database.
function insertSnapshot(id, repo_id, project_folder_id, description) { }

// Update a snapshot's fields in the database.
function updateSnapshot(id) { }

// Delete a snapshot from the database.
function deleteSnapshot(id) { }

/*** wavBase.project_folder queries ***/
// Insert a new projct folder into the database.
function insertProjFolder(id, project_file, snippet, midi_files, sample_files){ }

function deleteProjFolder(id) { }

/*** wavBase.comments queries ***/

/*** wavBase.tags queries ***/

