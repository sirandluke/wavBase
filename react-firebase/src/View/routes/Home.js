import React from "react";
import db from "../../Model/base";
import "../../App.css";

const Home = () => {

    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => db.auth().signOut()}>Sign Out</button>
        </div>
    );
}

export default Home;