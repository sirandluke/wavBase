import React from "react";

function TestModule(props) {
    return (
        <div>
            <img id="profile_image" width={100} height={100}/>
            <h2 id={'display_username'}>username</h2>
            <p id={'follow'}>0 followers 0 following</p>
            <p id={'bio'}>Bio</p>
            <h2>Your Repositories</h2>
            <button>Create Repository</button>

        </div>
    );
};

export default TestModule;