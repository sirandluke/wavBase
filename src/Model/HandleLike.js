const db = require('../Database_config');

module.exports = function HandleLike(repo_id, likes) {
    const repo_path = db.database().ref('repositories/' + repo_id);

    repo_path.update({
        likes: likes
    }).then(r => {
        console.log('New Like List:', likes);
    });
}