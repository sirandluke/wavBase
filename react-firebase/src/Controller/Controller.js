const express = require('express');
const router = express.Router();
const file_upload = require('express-fileupload');

const GetUserInfo = require('../Model/GetUserInfo');
const GetRepos = require('../Model/GetRepos');
const GetUsers = require('../Model/GetUsers');
const GetProfileImageUrl = require('../Model/GetProfileImageUrl');

const CreateUser = require('../Model/CreateUser');
const CreateRepo = require('../Model/CreateRepo');
const UploadProfileImage = require('../Model/UpdateProfileImage');
const UpdateUserInfo = require('../Model/UpdateUserInfo');
const UpdatePassword = require('../Model/UpdatePassword');
const HandleFollow = require('../Model/HandleFollow');

router.get('/user_info', (req, res) => {
    //console.log("router GetUserInfo executed");
    GetUserInfo(req.query.current_uid)
        .then(doc => res.send(doc));
});

router.get('/repo_list', (req, res) => {
    GetRepos()
        .then(doc => res.send(doc));
});

router.get('/user_list', (req, res) => {
    GetUsers()
        .then(doc => res.send(doc));
});

router.get('/user_info/get_image_url', (req, res) => {
    GetProfileImageUrl(req.query.image_path)
        .then(doc => res.send(doc));
})


router.post('/user_info/create_user', (req, res) => {
    CreateUser(req.body.username, req.body.password, req.body.email);
})

router.post('/repo_info/create_repo', (req, res) => {
    console.log('create repo');
    CreateRepo(req.body.uid, req.body.repo_name, req.body.bpm, req.body.key, req.body.tags, req.body.is_private, req.body.description)
})

router.post('/user_info/update_profile_image', (req, res) => {
    if (!req.files) {
        return res.status(500).send({msg: "file is not found"});
    }
    console.log('file field found');
    const image_file = req.files.file;
    const image_local_path = `./public/${image_file.name}`;
    console.log('file found');
    image_file.mv(image_local_path, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).send({msg: "Error occurred"});
        }
        return res.send({name: image_file.name, path: `/${image_file.name}`});
    });
    console.log('file processed');
    UploadProfileImage(image_local_path, image_file);
});

router.post('/user_info/update_user_info', (req, res) => {
    UpdateUserInfo(req.body.uid, req.body.username, req.body.bio, req.body.image_path);
});

router.post('/user_info/update_password', (req, res) => {
    UpdatePassword(req.body.uid, req.body.password);
});

router.post('/user_info/follow', (req, res) => {
    HandleFollow(req.body.uid, req.body.current_uid, req.body.type);
});

module.exports = router;