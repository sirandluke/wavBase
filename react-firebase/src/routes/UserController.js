const GetUserInfo = require('../model/GetUserInfo');
const express = require('express');
const router = express.Router();

router.get('/user_info', (req, res) => {
    console.log("router GetUserInfo executed");
    GetUserInfo(req.query.uid).then(doc => res.send(doc));
})

module.exports = router;