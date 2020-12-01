/*
    FirebaseHandler.js
 */
import db from "./base.js";
import * as K from "../Constants.js";
import {DateToString} from "./Date";

/*** wavBase.users queries ***/

const ref = db.database().ref();

/**
 * Creates a data entry for new user
 * @param {string} username 
 * @param {string} password 
 * @param {string} email 
 */
export function createUser(username, password, email) {
    // Creates user id with email and password values
    db
    .auth()
    .createUserWithEmailAndPassword(
        email,
        password
    );

    // Sets child values for user id
    db.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.database().ref('users/' + user.uid).set({
                username: username,
                email: email,
                biography: K.empty,
                profile_picture: K.default_user_png,
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

/**
 * Deletes user by user id
 * @param {string} id 
 */
export function deleteUser(id) { 
    try {
        ref.child("users/" + id).remove().then(() => {
            console.log("Deleted " + id);
        });
    } catch(error) {
        console.log(error.message);
    }
}

/*** wavBase.repositories queries ***/

/**
 * Insert a new repository into the wavBase/repositories.
 * @param {string} tags_id
 * @param {string} repo_name
 * @param {string} bpm
 * @param {string} key
 * @param {string} description
 * @return {int}
 */
export function insertRepository(tags_id, repo_name, bpm,
                                 key, description) {
    console.log("Creating a new Repository");
    try {
        let uid = db.auth().currentUser.uid
        let firebaseRef = db.database().ref("repositories/")
        firebaseRef.push({
            user_id: uid,
            name: repo_name,
            bpm: bpm,
            key: key,
            description: description,
            snapshots: K.empty,
            repo_likes: 0,
            comments: K.empty,
            thumbnail: K.default_repo_png,  // set default repository image.
            upload_date: DateToString()
        })
        firebaseRef.off();

        return 1;  // Insert Successful
    }
    catch (error){
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        alert(K.unknown_err);
        return 0; // Insert Fail
    }
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

