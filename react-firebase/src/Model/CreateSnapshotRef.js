const db = require('../Database_config');

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
        a: a,
        b: b
    }).then(r => {})
    return ref.once('value').then(r => r.val())
}