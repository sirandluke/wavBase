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

export const createRepo = (tags_id, repo_name, bpm, key, description) => {
    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            tags_id, repo_name, bpm, key, description
        })
    };
    fetch('http://localhost:8000/repo_info/create_repo', config)
        .catch(error => console.log(error));
}