export const getUserRef = (uid) => {
    let config = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    return fetch('http://localhost:8000/user_info?current_uid=' + uid, config)
        .then(response => response.json())
        .catch(error => console.log("Home page " + error));
}

export const getProfileImageUrl = (image_path) => {
    let config = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    return fetch('http://localhost:8000/user_info/get_image_url?image_path=' + image_path, config)
        .then(response => response.json())
        .catch(error => console.log("Home page " + error));
}

export const UpdateUserInfo = (uid, username, bio, image_path) => {
    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            uid, username, bio, image_path
        })
    };
    fetch('http://localhost:8000/user_info/update_user_info', config)
        .catch(error => console.log(error));
}

export const UpdateUserPassword = (uid, password) => {
    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            uid, password
        })
    };
    fetch('http://localhost:8000/user_info/update_password', config)
        .catch(error => console.log(error));
}

export const findRepos = (uid) => {
    let config = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    return fetch('http://localhost:8000/repo_list?uid=' + uid, config)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export const updateFollow = (uid, current_uid, type) => {
    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            uid, current_uid, type
        })
    };
    fetch('http://localhost:8000/user_info/follow?uid=' + uid, config)
        .catch(error => console.log(error));
}

export const findUsers = (uid) => {
    let config = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    return fetch('http://localhost:8000/user_list?' + uid, config)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export const CreateUser = (username, password, email) => {
    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username, password, email
        })
    };
    fetch('http://localhost:8000/user_info/create_user', config)
        .catch(error => console.log(error));
}

export const CreateRepo = (uid, repo_name, bpm, key, tags, is_private, description) => {
    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            uid, repo_name, bpm, key, tags, is_private, description
        })
    };
    fetch('http://localhost:8000/repo_info/create_repo', config)
        .catch(error => console.log(error));
}

export const UpdateRepoInfo = (repo_id, tags, description) => {
    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            repo_id, tags, description
        })
    };
    fetch('http://localhost:8000/repo_info/update_repo_info', config)
        .catch(error => console.log(error));
}

export const UpdateSnapshotInfo = (snapshot_id, description) => {
    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            snapshot_id, description
        })
    };
    fetch('http://localhost:8000/snapshot_info/update_snapshot_info', config)
        .catch(error => console.log(error));
}

export const GetRepoInfo = (repo_id) => {
    let config = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    return fetch('http://localhost:8000/repo_info?repo_id=' + repo_id, config)
        .then(response => response.json())
        .catch(error => console.log(error));
}