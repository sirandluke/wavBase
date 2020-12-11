const admin = require('../Admin_config');

module.exports = function GetFileUrl(path) {
    console.log(path);
    const file = admin.storage().bucket("wavbasedb-9a679.appspot.com").file(path);
    return file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
    }).then(url => url).catch(error => console.log(error));
}