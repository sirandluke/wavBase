const admin = require('../Admin_config');
const fs = require('fs');

module.exports = function UploadSnapshotFile(file, local_path, destination) {

    const bucket = admin.storage().bucket("wavbasedb-9a679.appspot.com");
    console.log(local_path);
    console.log(destination);


    const upload_options = {
        destination: destination
    }
    /*bucket.upload(local_path, upload_options, function (err, file) {
        if (!err) {
            fs.unlinkSync(local_path);
            console.log(`Upload New Snapshot File ${file.name} Success`);
        } else {
            fs.unlinkSync(local_path);
            console.log('Error uploading file: ' + err);
        }
    });*/
    return bucket.upload(local_path, upload_options).then(r => r);
}