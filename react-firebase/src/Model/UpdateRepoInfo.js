const db = require('../Database_config');

module.exports = function UpdateRepoInfo(repo_id, tags, description) {
    const repo_path = db.database().ref('repositories/' + repo_id);
    let updates = {};
    if (tags !== '') {
        updates['tags'] = tags;
    }
    if (description !== '') {
        updates['description'] = description;
    }
    repo_path.update(updates).then(r => {
        if (tags !== '') {
            console.log('New Tags:', tags);
        }
        if (description !== '') {
            console.log('New Description:', description);
        }
    });
}