const db = require('../Database_config');

module.exports = function GetUserInfo(uid) {
    console.log("GetUserInfo executed, uid = " + uid);
    return db.database().ref('users/' + uid).once('value')
        .then(snapshot => snapshot.val())
        .catch(error => console.log("Get user info error:", error));
}