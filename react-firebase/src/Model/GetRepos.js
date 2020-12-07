const db = require('../Database_config');

module.exports = function GetRepos() {
    const repo_ref = db.database().ref().child('repositories');
    return repo_ref.once('value')
        .then(snapshot => snapshot.val())
        .catch(error => console.log(error));
}
