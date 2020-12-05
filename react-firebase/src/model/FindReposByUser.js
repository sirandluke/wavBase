const db = require('../Realtime_Database_config');

module.exports = function FindReposByUser(uid) {
    const repo_ref = db.database().ref().child('repositories');
    return repo_ref.once('value')
        .then(snapshot => snapshot.val())
        .catch(error => console.log(error));
}
