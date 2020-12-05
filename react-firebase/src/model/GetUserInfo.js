const db = require('../firebase_config');

module.exports = function GetUserInfo(uid) {
    console.log("GetUserInfo executed");
    return db.database().ref('users' + uid).once('value')
        .then(snapshot => {snapshot.val()})
        .catch(error => console.log("model" + error));
}