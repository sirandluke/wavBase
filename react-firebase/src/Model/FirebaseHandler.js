/*
    FirebaseHandler.js
 */
import db from "./base.js";
import * as K from "../Constants.js";

/*** wavBase.users queries ***/
// Insert a new user into the database.
function insertUser(id, username, password, email, first_name, last_name) {
    // These values will later be specified by the user.
    let biography = "";
    let profile_picture = "";
    let followers = "";
    let following = "";

    // db insert query.
    
}

/**
 * Queries for user id based on email passed in
 * @param {string} email 
 * @param {function} callback
 */
export function getUserByEmail(email, callback) {
    try {
        let uid = "";
        let ref = db.database().ref();

        // Sort children by email and query matching email; store in snapshot
        ref.child('users').orderByChild('email').equalTo(email).once("value", (snapshot) => {

            // Data entry in snapshot should contain table for this user
            snapshot.forEach((entry) => {
                uid = entry.key;
            });

            // Callback once finish processing snapshot data
            callback(uid);

        }, function(error) {
            console.error(error);
        });

    } catch(error) {
        console.log(error.message);
    }
}

// Update a user's fields in the database.
function updateUser(id) { }

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

export default {getUserByEmail};