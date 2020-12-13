const express = require('express');
const router = express.Router();
const file_upload = require('express-fileupload');
const fs = require('fs');

const GetUserInfo = require('../Model/GetUserInfo');
const GetRepos = require('../Model/GetRepos');
const GetUsers = require('../Model/GetUsers');
const GetProfileImageUrl = require('../Model/GetProfileImageUrl');
const GetRepoInfo = require('../Model/GetRepoInfo');
const GetSnapshotListByRepoId = require('../Model/GetSnapshotListByRepoId');
const GetSnapshotInfo = require('../Model/GetSnapshotInfo');
const GetFileMetaData = require('../Model/GetFileMetadata');
const GetFileUrl = require('../Model/GetFileUrl');
const SignIn = require('../Model/SignIn');
const CreateSnapshotRef = require('../Model/CreateSnapshotRef');

const CreateUser = require('../Model/CreateUser');
const CreateRepo = require('../Model/CreateRepo');
const CreateSnapshot = require('../Model/CreateSnapshot');
const UploadProfileImage = require('../Model/UploadProfileImage');
const UpdateUserInfo = require('../Model/UpdateUserInfo');
const UpdateRepoInfo = require('../Model/UpdateRepoInfo');
const UpdateSnapshotInfo = require('../Model/UpdateSnapshotInfo');
const UpdatePassword = require('../Model/UpdatePassword');
const HandleFollow = require('../Model/HandleFollow');
const HandleComment = require('../Model/HandleComment');
const HandleLike = require('../Model/HandleLike');
const UploadSnapshotFile = require('../Model/UploadSnapshotFile');
const DeleteSnapshot =  require('../Model/DeleteSnapshot');
const DeleteRepo = require('../Model/DeleteRepo');

router.get('/user_info', (req, res) => {
    //console.log("router GetUserInfo executed");
    GetUserInfo(req.query.current_uid)
        .then(doc => res.send(doc));
});

router.get('/repo_list', (req, res) => {
    GetRepos()
        .then(doc => res.send(doc));
});

router.get('/user_list', (req, res) => {
    GetUsers()
        .then(doc => res.send(doc));
});

router.get('/user_info/get_image_url', (req, res) => {
    GetProfileImageUrl(req.query.image_path)
        .then(doc => res.send(doc));
})

router.get('/repo_info', (req, res) => {
    GetRepoInfo(req.query.repo_id)
        .then(doc => res.send(doc));
})

router.get('/snapshot_list', (req, res) => {
    GetSnapshotListByRepoId(req.query.repo_id)
        .then(doc => res.send(doc));
})

router.get('/snapshot_info', (req, res) => {
    GetSnapshotInfo(req.query.snap_id)
        .then(doc => res.send(doc));
})

router.get('/file_link', (req, res) => {
    GetFileMetaData(req.query.file_path)
        .then(doc => res.send(doc));
})

router.get('/file_url', (req, res) => {
    GetFileUrl(req.query.file_path)
        .then(doc => res.send(doc));
})

router.get('/snapshot_info/create_snapshot_ref', (req, res) => {
    CreateSnapshotRef(req.query.des, req.query.files, req.query.repo_id, req.query.date)
        .then(doc => res.send(doc));
})

router.get('/snapshot_info/delete_snapshot', (req, res) => {
    DeleteSnapshot(req.query.snap_id, req.query.repo_id)
        .then(doc => res.send(doc));
})


//Post Functions
router.post('/sign_in', (req, res) => {
    SignIn(req.body.email, req.body.password)
        .then(doc => res.send(doc));
})

router.post('/user_info/create_user', (req, res) => {
    CreateUser(req.body.username, req.body.password, req.body.email);
})

router.post('/repo_info/create_repo', (req, res) => {
    console.log('create repo');
    CreateRepo(req.body.uid, req.body.repo_name, req.body.bpm, req.body.key, req.body.tags, req.body.is_private, req.body.description)
})

router.post('/user_info/update_profile_image', (req, res) => {
    if (!req.files) {
        return res.status(500).send({msg: "file is not found"});
    }
    console.log('file field found');
    const image_file = req.files.file;
    const image_local_path = `../tmp_file/${image_file.name}`;
    console.log('file found');
    image_file.mv(image_local_path, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).send({msg: "Error occurred"});
        }
        UploadProfileImage(image_local_path, image_file);
        return res.send({name: image_file.name, path: `/${image_file.name}`});
    });
});

router.post('/user_info/update_user_info', (req, res) => {
    UpdateUserInfo(req.body.uid, req.body.username, req.body.bio, req.body.image_path);
});

router.post('/user_info/update_password', (req, res) => {
    UpdatePassword(req.body.uid, req.body.password);
});

router.post('/user_info/follow', (req, res) => {
    HandleFollow(req.body.uid, req.body.current_uid, req.body.type);
});

router.post('/repo_info/update_repo_info', (req, res) => {
    UpdateRepoInfo(req.body.repo_id, req.body.tags, req.body.description);
});

router.post('/snapshot_info/update_snapshot_info', (req, res) => {
    UpdateSnapshotInfo(req.body.snapshot_id, req.body.description);
})

router.post('/snapshot_info/create_snapshot', (req, res) => {
    CreateSnapshot(req.body.description, req.body.files, req.body.repo_id, req.body.upload_date);
})

router.post('/snapshot_info/upload_file', (req, res) => {
    if (!req.files) {
        return res.status(500).send({msg: "file is not found"});
    }
    console.log('file field found');
    const file = req.files.file;
    const local_path = `../tmp_file/${file.name}`;
    console.log('file found');
    file.mv(local_path, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).send({msg: "Error occurred"});
        }
        UploadSnapshotFile(file, local_path, req.query.destination)
            .then(doc => {
                fs.unlinkSync(local_path);
                res.send({name: file.name, path: `/${file.name}`})
            });
    });
})

/*router.post('/snapshot_info/delete_snapshot', (req, res) => {
    DeleteSnapshot(req.body.snap_id);
})*/

router.post('/repo_info/delete_repo', (req, res) => {
    DeleteRepo(req.body.repo_id);
})

router.post('/repo_info/add_comment', (req, res) => {
    HandleComment(req.body.repo_id, req.body.username, req.body.comment);
})

router.post('/repo_info/update_likes', (req, res) => {
    HandleLike(req.body.repo_id, req.body.likes);
})

module.exports = router;