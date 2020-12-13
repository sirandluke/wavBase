const db = require('../Database_config');
const GetSnapshotListByRepoId = require('./GetSnapshotListByRepoId');

module.exports = function CreateSnapshotRef(a, b) {
    console.log('Creating new snapshot reference');
    let firebaseRef = db.database().ref("snapshots/")
    console.log(a, b);
    /*return firebaseRef.push({
        test: 'test'
    }).then(r => r);*/
    let ref = firebaseRef.push();
    console.log(ref.key);
    ref.set({
        repo_id: a,
        description: b
    }).then(r => {})
    //return ref.once('value').then(r => r.val())
    return GetSnapshotListByRepoId(a).then(r => r);
}