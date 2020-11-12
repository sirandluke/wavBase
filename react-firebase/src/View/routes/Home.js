import React from "react";
import db from "../../Model/base";
import "../../App.css";
import logo from "../../Images/wavBase_logo.png";

// TODO: render searchbar, likes, (add more)

const Home = () => {
    return (
        <div className="container">
            <h1>Home</h1>
            <div className="nav">
                <h2>wavBase</h2>
                <img src={logo} alt="wavBase Logo" width="50" height="50" />
                <ul>
                    <li>Repositories</li>
                    <li>Likes</li>
                    <button onClick={() => db.auth().signOut()}>Sign Out</button>
                </ul>
            </div>
        </div>
    );
}

export default Home;