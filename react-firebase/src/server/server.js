const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
//const firebase = require("firebase/app");

// Add the Firebase products that you want to use
//require("firebase/auth");
//require("firebase/firestore");
app.use(fileUpload({}));
app.use(cors({
    credentials: true
}));
app.use(express.static('public')); //public is folder
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/', require('../routes/index'));

app.use('/', require('../routes/Controller'));


const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}`)
);