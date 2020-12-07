const express = require('express');
const router = express.Router();

const GetUserInfo = require('../model/GetUserInfo');
const GetRepos = require('../model/GetRepos');
const GetUsers = require('../model/GetUsers');


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

module.exports = router;