const db = require('../Database_config');

module.exports = function GetRepoInfo(repo_id) {
    console.log("GetRepoInfo executed, repo_id = " + repo_id);
    return db.database().ref('repositories/' + repo_id).once('value')
        .then(snapshot => snapshot.val())
        .catch(error => console.log("Get repo info error:" ,error));
}