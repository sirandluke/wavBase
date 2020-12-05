import {insertRepository} from "../../Model/FirebaseHandler";
import * as K from "../../Constants";
import logo from "../../Images/wavBase_logo.png";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import db from "../../Model/base";
import downArrow from "../../Images/downArrow.png";
import sine_wave_1 from "../../Images/sine_wave_1.png";
import React from "react";

{/*
let uid = db.auth().currentUser.uid;
this.firebaseRef = db.database().ref('users/' + uid);
this.storageRef = db.storage().ref();
*/}


const NewRepo = ({ history }) => {

    const createRepo = (event) => {  // Handles creating a new repository.
        event.preventDefault();
        const {
            repo_name,
            bpm,
            key,
            tags,  // TODO: Create tags.
            description
        } = event.target.elements;
        // TODO: Tags query


        if (insertRepository(K.empty, repo_name.value, bpm.value, key.value, description.value)) {  // Call insert repo.
            history.push("/repository");
        }

    }

    const redirectRepo = () => {
        history.push("/repository");
    }

    const redirectProfile = () => {
        history.push("/profile");
    }

    return(
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <div className="nav_bar">
                <img src={logo} className="nav_bar_logo" alt="wavBase Logo" />
                <DropdownButton className="user_dropdown" id="dropdown-basic-button" title="User">
                    <div className="dropdown_property">
                        <Dropdown.Item as="button" onClick={redirectProfile}>My Profile</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={redirectRepo}>My Repositories</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => db.auth().signOut()}>Sign Out</Dropdown.Item>
                    </div>
                </DropdownButton>
                <img src={downArrow} className="down_arrow" alt="Down Arrow" />
                {/*
                User profile pic and user tab


                */}
                <form className="search_bar">
                    <input className="search_input" className="type_box" type="text" placeholder=" Search"
                           name="search"/>
                    <button type="submit" ><i className="fa fa-search"></i></button>
                </form>

            </div>

            <form className="createRepo_form" onSubmit={createRepo}>
                <span className="bold_text">Create Repository</span> <br/>
                <label>
                    <input className="repo_name" type="text" required="required" placeholder="Repository name" />
                </label>
                <br />
                <label>
                    <input className="bpm" type="number" min="60" max="250" required="required" placeholder="BPM" />
                </label>
                <br />
                <label>
                    <input className="key" type="text" required="required" placeholder="Key Signature" />
                </label>
                <br />
                <label>
                    <input className="tags" type="text" placeholder="Tags" />
                </label>
                <br />
                <label>
                    <textarea name="description" cols="40" rows="5" placeholder="Description">

                    </textarea>
                </label
                ><br />
                <button className="create_button" type="submit">Create Repository</button>
            </form>

            <img src={sine_wave_1} className={"bottom_wave"} style={{width:"100%", height:"233", bottom:"-3rem", zIndex:"-99", position:"absolute"}}/>

        </div>
    );
};

export default NewRepo;