import React from "react";
import db from "../../Model/base";
import "../../App.css";
import logo from "../../Images/wavBase_logo.png";
import * as FirebaseHandler from '../../Model/FirebaseHandler';
import SearchBar from '../components/SearchBar';
import {Link, withRouter} from "react-router-dom";

// TODO: render searchbar, likes, (add more)

const Home = ({history}) => {
    const redirectCreateRepo = () => {
        history.push("/newrepo");
    }


    return (
        <div className="container">
            <h1>Home</h1>
            <div className="nav">
                <h2>wavBase</h2>
                <img src={logo} alt="wavBase Logo" width="50" height="50" />
                <SearchBar />
                <ul>
                    <button onClick={redirectCreateRepo}>Create Repository</button>
                    <li>Repositories</li>
                    <li>Likes</li>
                    <button onClick={() => db.auth().signOut()}>Sign Out</button>
                </ul>
            </div>
        </div>
    );
}

export default withRouter(Home);