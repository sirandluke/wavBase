import React from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import db from "../../Model/base";
import "../../App.css";
import logo from "../../Images/wavBase_logo.png";
import * as FirebaseHandler from "../../Model/FirebaseHandler.js";
import {HashRouter, NavLink} from "react-router-dom";
import {BrowserRouter} from 'react-router-dom'
import PrivateRoute from "../auth/PrivateRoute";
import Profile from "./Profile";
import Repository from "./Repository";
import NewRepo from "./NewRepo";
import IndividualRepository from "./IndividualRepository";
import SearchBar from "../components/SearchBar";
import ResultsInterface from "./ResultsInterface";
import SearchResultWithOptions from "../components/SearchResultWithOptions";

// TODO: render searchbar, likes, (add more)

const PersonalHome = () => {

    const user = db.auth().currentUser;
    const uid = user.uid;
    const user_name_path = 'users/' + uid + "/username";
    let name;

    function get_name(val) {
        name = val;
        console.log(name);
        document.getElementById('username').innerText = 'Hello ' + name;
    }

    FirebaseHandler.getData(user_name_path, get_name);

    const pro_pic_path = 'users/' + uid + "/profile_picture";

    function get_picture_path(val) {
        console.log(val);
        let storageRef = db.storage().ref();
        storageRef.child(val).getDownloadURL().then(function (url) {
            let img = document.getElementById('profile_avatar');
            img.src = url;
        });
    }

    FirebaseHandler.getData(pro_pic_path, get_picture_path);

    let repo_paths = [];

    function handleRepo(id_list) {
        id_list.forEach(entry => {
            repo_paths.push(
                <PrivateRoute exact path={'/' + entry} component={() => IndividualRepository(entry)}/>
            );
            console.log(entry);
        })
    }

    FirebaseHandler.findRepositories(uid, handleRepo);

    //let search_results = 'Not success';
    /*const handleSearch = (event) => {
        event.preventDefault();
        let search_input = document.getElementById("search_input").value;
        if (search_input != '') {
            search_results.push(search_input);
            console.log(search_input);
        }
        history.push('/search_result');
    }*/

    function handleSearch() {

    }

    //<img id='profile_avatar' src='' width={50} height={50}/>
    //<PrivateRoute exact path='/search_result' component={() => ResultsInterface('asdgasdgs')} />

    return (
        <div className="container">
            <div className="nav">
                <h2>wavBase</h2>
                <img src={logo} alt="wavBase Logo" width="50" height="50"/>
                {/*Search Bar Begin */}
                <form onSubmit={handleSearch}>
                    <label>
                        <input id='search_input' type="text" name="query"></input>
                    </label>
                    <HashRouter>
                        <button type="submit"><NavLink to='/search_result'>Search</NavLink></button>
                    </HashRouter>
                </form>
                {/*Search Bar End */}
                <h2 id="username">Hello</h2>
                <img id='profile_avatar' src='' width={50} height={50}/>
                <HashRouter>
                    <DropdownButton id="dropdown-basic-button" title="User">
                        <Dropdown.Item as="button"><NavLink to='/profile'>My Profile</NavLink></Dropdown.Item>
                        <Dropdown.Item as="button"><NavLink to='/'>My Repositories</NavLink></Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => db.auth().signOut()}>Sign Out</Dropdown.Item>
                    </DropdownButton>
                    <div>
                        <PrivateRoute exact path='/' component={Repository}/>
                        <PrivateRoute exact path='/profile' component={Profile}/>
                        <PrivateRoute exact path='/newrepo' component={NewRepo}/>
                        <PrivateRoute exact path='/search_result' component={() => ResultsInterface(document.getElementById("search_input").value)}/>
                        {repo_paths}
                    </div>
                </HashRouter>

            </div>
        </div>
    );
}

export default PersonalHome;