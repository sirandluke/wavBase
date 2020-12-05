const GetUserInfo = require('../model/GetUserInfo');
const UpdateProfileImage = require('../model/UpdateProfileImage');
const express = require('express');
const router = express.Router();

router.get('/user_info', (req, res) => {
    //console.log("router GetUserInfo executed");
    GetUserInfo(req.query.current_uid)
        .then(doc => res.send(doc));
});

router.post('/user_info/update_profile_image', (req, res) => {
    UpdateProfileImage(req.body.uid, req.body.picture, req.body.picture_path);
})

module.exports = router;