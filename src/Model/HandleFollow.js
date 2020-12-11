const db = require('../Database_config');

module.exports = function HandleFollow(uid, current_uid, type) {
    const user_path = db.database().ref('users/' + uid);
    const current_user_path = db.database().ref('users/' + current_uid);
    let user_snapshot, current_user_snapshot;
    user_path.once('value')
        .then(snapshot => {
            user_snapshot = snapshot.val();
            current_user_path.once('value')
                .then(snapshot => {
                    current_user_snapshot = snapshot.val();
                    if (type === 'follow') {
                        user_path.update({
                            followers: AddId(user_snapshot.followers, current_uid)
                        }).then(r => {
                            console.log(current_user_snapshot.username + ' added to ' + user_snapshot.username + '\'s followers');
                        })
                        current_user_path.update({
                            following: AddId(current_user_snapshot.following, uid)
                        }).then(r => {
                            console.log(user_snapshot.username + ' added to ' + current_user_snapshot.username + '\'s following');
                        })
                    }
                    else if (type === 'unfollow') {
                        user_path.update({
                            followers: DeleteId(user_snapshot.followers, current_uid)
                        }).then(r => {
                            console.log(current_user_snapshot.username + ' removed from ' + user_snapshot.username + '\'s followers');
                        })
                        current_user_path.update({
                            following: DeleteId(current_user_snapshot.following, uid)
                        }).then(r => {
                            console.log(user_snapshot.username + ' removed from ' + current_user_snapshot.username + '\'s following');
                        })
                    }
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
}

/**
 * @param {string} ids
 */
function ParseIds(ids) {
    let id = [];
    if (ids !== '' && ids != null) {
        id = ids.split(",");
    }
    return id;
}

/**
 * @param {string} ids
 * @param {string} id
 */
function AddId(ids, id) {
    if (ids === '') {
        return id;
    } else if (IncludeId(ids, id)) {
        return ids
    } else {
        return ids + ',' + id;
    }
}

/**
 * @param {string} ids
 * @param {string} id
 */
function DeleteId(ids, id) {
    if (ids === '') {
        return ids;
    } else if (IncludeId(ids, id)) {
        let id_list = ParseIds(ids);
        let result = '';
        id_list.forEach(entry => {
            if (entry !== id) {
                if (result === '') {
                    result = result + entry;
                }
                else {
                    result = result + ',' + entry;
                }
            }
        })
        return result;
    } else {
        return ids;
    }
}

/**
 * @param {string} ids
 * @param {string} id
 */
function IncludeId(ids, id) {
    let parsedIds = ParseIds(ids);
    if (parsedIds.includes(id)) {
        return true;
    } else {
        return false;
    }
}

/**
 * @param {string} ids
 */
function getIdCount(ids) {
    let parsedIds = ParseIds(ids);
    return parsedIds.length;
}