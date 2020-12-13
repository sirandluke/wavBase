import axios from "axios";

export const GetUserRef = (uid) => {
    let config = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    return fetch('http://localhost:8000/user_info?current_uid=' + uid, config)
        .then(response => response.json())
        .catch(error => console.log("Home page " + error));
}

export const GetProfileImageUrl = (image_path) => {
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

export const FindRepos = (uid) => {
    let config = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    return fetch('http://localhost:8000/repo_list?uid=' + uid, config)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export const UpdateFollow = (uid, current_uid, type) => {
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

export const FindUsers = (uid) => {
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

/*export const UpdateProfileImage = (picture_formData) => {
    axios.post('http://localhost:8000/user_info/update_profile_image', picture_formData, {
        /!*onUploadProgress: (ProgressEvent) => {
            let tmp_progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
            setProgress(tmp_progress);
        }*!/
    }).then(res => {
        console.log(res);
    }).catch(err => console.log(err));
}*/

export const GetRepoInfo = (repo_id) => {
    let config = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    return fetch('http://localhost:8000/repo_info?repo_id=' + repo_id, config)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export const GetSnapshotListByRepoId = (repo_id) => {
    let config = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    return fetch('http://localhost:8000/snapshot_list?repo_id=' + repo_id, config)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export const GetSnapshotInfo = (snap_id) => {
    let config = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    return fetch('http://localhost:8000/snapshot_info?snap_id=' + snap_id, config)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export const GetFileMetadata = (file_path) => {
    let config = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    return fetch('http://localhost:8000/file_link?file_path=' + file_path, config)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export const CreateSnapshot = (description, files, repo_id, upload_date) => {
    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            description, files, repo_id, upload_date
        })
    };
    fetch('http://localhost:8000/snapshot_info/create_snapshot', config)
        .catch(error => console.log(error));
}

export const GetFileUrl = (file_path) => {
    let config = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    return fetch('http://localhost:8000/file_url?file_path=' + file_path, config)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export const DeleteSnapshot = (snap_id, repo_id) => {
    let config = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    };
     return fetch('http://localhost:8000/snapshot_info/delete_snapshot?snap_id=' + snap_id + '&repo_id=' + repo_id, config)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export const DeleteRepo = (repo_id) => {
    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            repo_id
        })
    };
    fetch('http://localhost:8000/repo_info/delete_repo', config)
        .catch(error => console.log(error));
}

export const HandleComment = (repo_id, username, comment) => {
    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            repo_id, username, comment
        })
    };
    fetch('http://localhost:8000/repo_info/add_comment', config)
        .catch(error => console.log(error));
}

export const HandleLike = (repo_id, likes) => {
    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            repo_id, likes
        })
    };
    fetch('http://localhost:8000/repo_info/update_likes', config)
        .catch(error => console.log(error));
}

export const SignIn = (email, password) => {
    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email, password
        })
    };
    return fetch('http://localhost:8000/sign_in', config)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export const CreateSnapshotRef = (des, files, repo_id, date) => {
    let config = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    return fetch('http://localhost:8000/snapshot_info/create_snapshot_ref?des=' + des + '&files=' + files + '&repo_id=' + repo_id + '&date=' + date, config)
        .then(response => response.json())
        .catch(error => console.log(error));
}
