const db = require('../Database_config');

const DateToString = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate() <= 10 ? '0' + today.getDate() : today.getDate();
    const year = today.getFullYear();
    return month + '-' + day + '-' + year;
}

module.exports = function CreateRepo(uid, repo_name, bpm, key, tags, is_private, description) {
    console.log("Creating a new Repository");
    try {
        console.log(uid, 'is creating new repo');
        let firebaseRef = db.database().ref("repositories/")
        firebaseRef.push({
            user_id: uid,
            name: repo_name,
            bpm: bpm,
            key: key,
            tags: tags,
            description: description,
            is_private: is_private,
            snapshots: "",
            repo_likes: 0,
            comments: "",
            thumbnail: "defaults/default_repo_thumbnail.png",  // set default repository image.
            upload_date: DateToString()
        })
        firebaseRef.off();
    }
    catch (error){
        console.log(error)
    }
}
