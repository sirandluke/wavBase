import React, {Component} from "react";
import "./NameBioFollowers.css"
import {getIdCount} from "../GlobalComponent/ParseId";
import Popup from "reactjs-popup";
import FollowersPopUp from "../FollowPopUpComponents/FollowersPopUp";
import FollowingPopUp from "../FollowPopUpComponents/FollowingPopUp";

export function NameBioFollowers(props) {

    //console.log('namebio: ', props.uid);
    const checkFollower = () => {
        return getIdCount(props.followers);
    }

    const checkFollowing = () => {
        return getIdCount(props.following);
    }

    return (
        <div>
            <h3 id="username">{props.username}</h3>
            <Popup id={props.uid + 'followers popup'}
                   trigger={<button id={props.uid + 'followers button'}>{checkFollower()} followers</button>}
                   position={'right center'}>
                <FollowersPopUp id={props.uid}/>
            </Popup>
            <Popup id={props.uid + 'following popup'}
                   trigger={<button id={props.uid + 'following button'}>{checkFollowing()} following</button>}
                   position={'right center'}>
                <FollowingPopUp id={props.uid}/>
            </Popup>
            <hr/>
            <div className="bio_div">
                <p id="bio">{props.biography}</p>
            </div>
        </div>
    )

}