import * as K from "../Constants";
import {DateToString} from "../GlobalComponent/Date";

const db = require('../Database_config');

module.exports = function CreateRepo(tags_id, repo_name, bpm, key, description) {
    console.log("Creating a new Repository");
    try {
        let uid = db.auth().currentUser.uid
        let firebaseRef = db.database().ref("repositories/")
        firebaseRef.push({
            user_id: uid,
            name: repo_name,
            bpm: bpm,
            key: key,
            description: description,
            snapshots: K.empty,
            repo_likes: 0,
            comments: K.empty,
            thumbnail: K.default_repo_png,  // set default repository image.
            upload_date: DateToString()
        })
        firebaseRef.off();
    }
    catch (error){
        console.log(error)
        alert(K.unknown_err);
    }
}
