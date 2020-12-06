import React from "react";
import db from "../../Database_config";
import "../../App.css";
import logo from "../../Images/wavBase_logo.png";
import * as FirebaseHandler from '../../model/FirebaseHandler';
import SearchBar from '../components/SearchBar';

// TODO: render searchbar, likes, (add more)

const Home = ({history}) => {
    const redirectCreateRepo = () => {
        history.push("/newrepo");
    }

    const redirectRepo = () => {
        history.push("/repository");
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
                    <button onClick={redirectRepo}>TestRepositories</button>
                    <li>Repositories</li>
                    <li>Likes</li>
                    <button onClick={() => db.auth().signOut()}>Sign Out</button>
                </ul>
            </div>
        </div>
    );
}

export default Home;