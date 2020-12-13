const db = require('../Database_config');

module.exports = function UpdateSnapshotInfo(snapshot_id, description) {
    const snapshot_path = db.database().ref('snapshots/' + snapshot_id);
    if (description !== '') {
        snapshot_path.update({
            description: description
        }).then(r => {
            console.log('Snapshot', snapshot_id + "'s description updated to", description);
        })
    }
}