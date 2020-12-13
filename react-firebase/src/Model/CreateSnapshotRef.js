const db = require('../Database_config');
const GetSnapshotListByRepoId = require('./GetSnapshotListByRepoId');

module.exports = function CreateSnapshotRef(des, files, repo_id, date) {
    console.log('Creating new snapshot reference');
    let firebaseRef = db.database().ref("snapshots/");
    /*return firebaseRef.push({
        test: 'test'
    }).then(r => r);*/
    let ref = firebaseRef.push();
    console.log(ref.key);
    ref.set({
        description: des,
        files: files,
        repo_id: repo_id,
        upload_date: date
    }).then(r => {})
    //return ref.once('value').then(r => r.val())
    return GetSnapshotListByRepoId(repo_id).then(r => r);
}