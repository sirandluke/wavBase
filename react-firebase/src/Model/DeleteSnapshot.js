const admin = require('../Admin_config');
const db = require('../Database_config');
const GetSnapshotListByRepoId = require('./GetSnapshotListByRepoId');

module.exports = async function DeleteSnapshot(snap_id, repo_id) {
    console.log("GetSnapshotInfo executed, snap_id = " + snap_id);
    const bucket = admin.storage().bucket("wavbasedb-9a679.appspot.com");
    let files = [];
    await db.database().ref('snapshots/' + snap_id).once('value')
        .then( snapshot => {
            files = snapshot.val().files.split(',');
            files.forEach(async file_path => {
                console.log('Deleting file', file_path);
                const file_destination = bucket.file(file_path);
                await file_destination.delete()
                    .then( async r => {
                        console.log(`Delete file ${file_path} success`)
                        await db.database().ref('snapshots/' + snap_id).remove()
                            .then(async () => {
                                await console.log(`Successfully deleted snapshot ${snap_id} from database`);
                            })
                            .catch(error => console.log("Delete snapshot error:", error));
                    })
                    .catch(error => console.log(`Delete file ${file_path} error ${error}`))
            })
        })
        .catch(error => console.log("Get snapshot info error:", error));
    return await GetSnapshotListByRepoId(repo_id)
        .then(r => r);
}