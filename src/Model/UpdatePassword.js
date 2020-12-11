const admin = require('../Admin_config');

module.exports = function UpdatePassword(uid, password) {
    admin.auth().updateUser(uid, {
        password: password
    }).then(function () {
        console.log('Password Updated to ' + password);
    }).catch(function (error) {
        console.log('Password Update Failed');
    });
}