const express = require('express');
const router = express.Router();
const GetUserInfo = require('../model/GetUserInfo');
const GetRepos = require('../model/GetRepos');
const GetUsers = require('../model/GetUsers');

const UpdateProfileImage = require('../model/UpdateProfileImage');
const UpdateUserInfo = require('../model/UpdateUserInfo');
const UpdatePassword = require('../model/UpdatePassword');

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

router.post('/user_info/update_profile_image', (req, res) => {
    UpdateProfileImage(req.body.uid, req.body.picture, req.body.picture_path);
});

router.post('/user_info/update_user_info', (req, res) => {
    UpdateUserInfo(req.body.uid, req.body.username, req.body.bio);
});

router.post('/user_info/update_password', (req, res) => {
    UpdatePassword(req.body.uid, req.body.password);
});

module.exports = router;