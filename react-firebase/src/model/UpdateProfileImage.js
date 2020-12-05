const db = require('../Realtime_Database_config');
const storage = require('../Admin_config');

module.exports = function UpdateProfileImage(uid, picture, picture_path) {
    console.log(picture_path);
    const picture_bucket = storage.bucket(picture_path);
    picture_bucket.upload(picture, function (err, file) {
        if (!err) {
            console.log('Upload New Profile Picture Success');
            let userRef = db.database().ref('users/' + uid);
            userRef.update({
                profile_picture: picture_path
            });
        } else {
            console.log('Error uploading file: ' + err);
        }
    })
}