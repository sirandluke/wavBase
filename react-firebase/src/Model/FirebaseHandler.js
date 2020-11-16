/*
    FirebaseHandler.js
 */
import db from "./base";
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

// Get a user from the the database.
function getUser() {

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


