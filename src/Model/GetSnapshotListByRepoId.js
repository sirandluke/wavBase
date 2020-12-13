const db = require('../Database_config');

module.exports = function GetSnapshotListByRepoId(repo_id) {
    console.log("Get Snapshot List executed, repo_id = " + repo_id);
    return db.database().ref('snapshots').orderByChild('repo_id').equalTo(repo_id).once('value')
        .then(snapshot => snapshot.val())
        .catch(error => console.log(error));
}