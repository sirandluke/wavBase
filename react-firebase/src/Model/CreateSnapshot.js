const db = require('../Database_config');

module.exports = function CreateSnapshot(description, files, repo_id, upload_date) {
    console.log('Creating a new snapshot');
    try {
        let firebaseRef = db.database().ref("snapshots/")
        firebaseRef.push({
            description: description,
            files: files,
            repo_id: repo_id,
            upload_date: upload_date
        })
        firebaseRef.off();
    }
    catch (error){
        console.log(error);
    }
}