const db = require('../Database_config');

module.exports = function GetUsers() {
    const repo_ref = db.database().ref().child('users');
    return repo_ref.once('value')
        .then(snapshot => snapshot.val())
        .catch(error => console.log(error));
}