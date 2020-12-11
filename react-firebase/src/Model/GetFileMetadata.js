const admin = require('../Admin_config');

module.exports = function GetFileMetadata(file_path) {
    const bucket = admin.storage().bucket("wavbasedb-9a679.appspot.com");
    console.log('Getting metadata from', file_path);

    const file_ref = bucket.file(file_path);
    return file_ref.getMetadata()
        .then(metadata => metadata)
        .catch(error => console.log("Get Metadata error:" ,error));
}