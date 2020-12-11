const admin = require('../Admin_config');
const db = require('../Database_config');
const DeleteSnapshot = require('./DeleteSnapshot');
const GetSnapshotListByRepoId = require('./GetSnapshotListByRepoId');

module.exports = function DeleteRepo(repo_id) {
    db.database().ref('snapshots').orderByChild('repo_id').equalTo(repo_id).once('value')
        .then(snapshot => {
            for (let snap in snapshot.val()) {
                DeleteSnapshot(snap);
            }
            db.database().ref('repositories/' + repo_id).remove()
                .then(() => {
                    console.log(`Successfully deleted repo ${repo_id} from database`);
                })
                .catch(error => console.log("Delete repo error:", error));
        })
        .catch(error => console.log(error));
}