const db = require('../Database_config');

module.exports = function GetSnapshotInfo(snap_id) {
    console.log("GetSnapshotInfo executed, snap_id = " + snap_id);
    return db.database().ref('snapshots/' + snap_id).once('value')
        .then(snapshot => snapshot.val())
        .catch(error => console.log("Get snapshot info error:" ,error));
}