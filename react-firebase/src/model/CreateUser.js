const db = require('../Database_config');
const admin = require('../Admin_config');

module.exports = function CreateUser(username, password, email) {
    admin.auth().createUser({
        password: password,
        email: email,
    }).then(function (userRecord) {
        db.database().ref('users/' + userRecord.uid).set({
            username: username,
            email: email,
            biography: "",
            profile_picture: "defaults/test_user.png",
            followers: "",
            following: ""
        }).then(r => {
            console.log( 'Successfully created new user:', userRecord.uid);
        })
    }).catch(function (error) {
        console.log('Error creating new user:', error);
    });
}