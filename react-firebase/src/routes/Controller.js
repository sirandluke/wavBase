const express = require('express');
const router = express.Router();
const GetUserInfo = require('../model/GetUserInfo');
const GetRepos = require('../model/GetRepos');
const GetUsers = require('../model/GetUsers');
const GetProfileImageUrl = require('../model/GetProfileImageUrl');

const UpdateProfileImage = require('../model/UpdateProfileImage');
const UpdateUserInfo = require('../model/UpdateUserInfo');
const UpdatePassword = require('../model/UpdatePassword');
const HandleFollow = require('../model/HandleFollow');

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

/*router.get('/image_url', (req, res) => {
    GetProfileImageUrl(req.query.image_path)
        .then(doc => res.send(doc));
})*/

router.post('/user_info/update_profile_image', (req, res) => {
    UpdateProfileImage(req.body.uid, req.body.picture, req.body.picture_path);
});

router.post('/user_info/update_user_info', (req, res) => {
    UpdateUserInfo(req.body.uid, req.body.username, req.body.bio);
});

router.post('/user_info/update_password', (req, res) => {
    UpdatePassword(req.body.uid, req.body.password);
});

router.post('/user_info/follow', (req, res) => {
    HandleFollow(req.body.uid, req.body.current_uid, req.body.type);
});

module.exports = router;