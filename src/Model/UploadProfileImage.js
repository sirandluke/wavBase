const admin = require('../Admin_config');
const fs = require('fs');

module.exports = function UploadProfileImage(picture_path, picture) {

    const picture_bucket = admin.storage().bucket("wavbasedb-9a679.appspot.com");
    console.log(picture.name);


    const upload_options = {
        destination: ('defaults/' + picture.name)
    }
    console.log(picture_path);
    picture_bucket.upload(picture_path, upload_options, function (err, file) {
        if (!err) {
            fs.unlinkSync(picture_path);
            console.log('Upload New Profile Picture Success');
        } else {
            fs.unlinkSync(picture_path);
            console.log('Error uploading file: ' + err);
        }
    });
}


//const Stream = require('stream');
//const request = require('request');
//const http = require('http');

//const uploadNewFileFromStream = () => (picture_path) => (readStream) => {
/*function uploadNewFileFromStream(picture_path, readStream) {
    picture_path = 'defaults/1.png';
    const bucket = admin.storage().bucket("wavbasedb-9a679.appspot.com");
    const file = bucket.file(`${picture_path}`);

    const writeStream = file.createWriteStream({
        metadata: {
            contentType: 'image/!*'
        }
    })
    //const writeStream = file.createWriteStream();
    const result = new Promise((resolve, reject) => {
        writeStream.on('error', function (err) {
            reject(err);
        });
        writeStream.on('finish', function () {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${(encodeURI(picture_path)).replace(/\//g, "%2F")}`;
            resolve(publicUrl);
        });
    })

    readStream.pipe(writeStream);
    return result
}

const getStreamFromUrl = (url) => {
    return request('https://www.import.io/wp-content/uploads/2018/08/Screen-Shot-2018-08-20-at-11.16.18-AM-768x601.png');
}


module.exports = function UpdateProfileImage(uid, picture, picture_path) {
    picture = picture.substr(5);
    console.log(picture);
    uploadNewFileFromStream(picture_path, getStreamFromUrl(picture)).then(r => {
        console.log('Upload function executed');
    });
}*/
