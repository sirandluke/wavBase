import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import db from "../../Model/base";
import "./PersonalHome.css";
import logo from "../../Images/wavBase_logo.png";
import './PersonalHome.css';
import '../../App.css'
import '../NavBarComponents/NavBar.css'
import NavBar from '../NavBarComponents/NavBar.js';
//import Home from "./Home";

import RepositoryList from "../HomePageComponents/RepositoryList";



//import Repository from "./Repository";
import PrivateRoute from "../auth/PrivateRoute";
import NewRepo from "./NewRepo";
import Snapshot from "./Snapshot";
import Profile from "./Profile";
import ResultsInterface from "./ResultsInterface";
import UserSearchResult from "../SearchComponents/UserSearchResult";
import RepoSearchResult from "../SearchComponents/RepoSearchResult";
import TagsSearchResult from "../SearchComponents/TagsSearchResult";
import {Route} from "react-router";
import Repository from "./Repository";
import {SnapshotList} from "../RepositoryPageComponents/SnapshotList";

// TODO: render searchbar, likes, (add more)
const PersonalHome = ({history}, props) => {

    /*
    let user = db.auth().currentUser;
    //let name, email, photoUrl, uid, emailVerified;
    let name = "User";
    if (user != null) {
        //name = user.email;
        let username;
        let uid = db.auth().currentUser.uid;
        let firebaseRef = db.database().ref('users/' + uid);
        firebaseRef.on('value', (snapshot) =>{
            username = snapshot.val().username;
            name = username;
        })
    }
*/

    // let uid = db.auth().currentUser.uid;
    // let userRef = db.database().ref('users/' + uid);
    // let username, profile_picture_path, user_email;
    // userRef.on('value', (snapshot) =>{
    //     username = snapshot.val().username;
    //     profile_picture_path = snapshot.val().profile_picture;
    //     user_email = snapshot.val().email;
    // })
    //
    // let storage = db.storage();
    // let storageRef = storage.ref();
    // storageRef.child(profile_picture_path).getDownloadURL().then(function (url) {
    //     let img2 = document.getElementById('profile_picture2');
    //     img2.src = url;
    // })

    return (
        <div>
            <NavBar />
            {/*<PrivateRoute exact path="/" component={RepositoryList}/>
            <PrivateRoute exact path="/newrepo" component={NewRepo}/>
            <PrivateRoute exact path="/snapshot" component={Snapshot}/>
            <PrivateRoute exact path="/profile" component={Profile}/>
            <PrivateRoute path='/search_result' component={ResultsInterface}/>
            <PrivateRoute exact path='/search_result' component={UserSearchResult}/>
            <PrivateRoute exact path='/search_result/repositories'
                          component={RepoSearchResult}/>
            <PrivateRoute exact path='/search_result/tags'
                          component={TagsSearchResult}/>
            <PrivateRoute path={'/user/:user_id'} component={RepositoryList}/>
            <Route path={"/repo/:repo_id"} component={Repository}/>
            <Route exact path={'/repo/:repo_id'} component={SnapshotList} />
            <PrivateRoute exact path={'/repo/:repo_id/settings'} component={RepositorySettings}/>
            <Route exact path={"/repo/:repo_id/snapshot/:snap_id"} component={Snapshot}/>*/}
        </div>

    );
}

export default PersonalHome;