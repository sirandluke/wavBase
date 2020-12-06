const db = require('../Database_config');

module.exports = function UpdateUserInfo(uid, username, bio) {
    const user_path = db.database().ref('users/' + uid);
    if (username !== '') {
        user_path.update({
           username: username
        });
        console.log('New Username: ' + username);
    }
    if (bio !== '') {
        user_path.update({
            biography: bio
        });
        console.log('New Bio: ' + bio);
    }
}