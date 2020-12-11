const db = require('../Database_config');

module.exports = function HandleComment(repo_id, username, comment) {
    try {
        db.database().ref('/repositories/' + repo_id + '/comments').push({
            username: username,
            text: comment
        })
        console.log(`Add ${username}'s comment \"${comment}\" to repo ${repo_id}`);
    } catch (error) {
        console.log(error);
    }
}