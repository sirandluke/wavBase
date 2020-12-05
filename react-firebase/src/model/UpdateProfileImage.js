const db = require('../firebase_config');

module.exports = function UpdateProfileImage(uid, picture, picture_path) {
    db.
    db.storage().ref().child(picture_path).put(picture).then(function(snapshot) {
        console.log('New Profile Picture Uploaded');
    });
    let userRef = db.database().ref('users/' + uid);
    userRef.update({
        profile_picture: picture_path
    });
}