const db = require('../Database_config');

module.exports = function GetProfileImageUrl(image_path) {
    console.log('getting url');
    return db.storage().ref().child(image_path).getDownloadURL().then(url => url);
}