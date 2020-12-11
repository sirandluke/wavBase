const admin = require('../Admin_config');

module.exports = function GetProfileImageUrl(image_path) {
    console.log(image_path);
    const file = admin.storage().bucket("wavbasedb-9a679.appspot.com").file(image_path);
    return file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
    }).then(url => url).catch(error => console.log(error));
}