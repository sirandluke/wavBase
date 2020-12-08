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