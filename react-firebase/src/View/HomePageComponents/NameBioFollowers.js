import React,{Component} from "react";
import { Redirect } from "react-router-dom";
import {FollowerCount} from "./FollowerCount";
import "./NameBioFollowers.css"

export class NameBioFollowers extends Component{
    render(){
        // if (this.props.followers == '')
        //     this.props.followers = 0
        // if (this.props.following == '')
        //     this.props.following = 0
        const checkFollower = () => {
            if (this.props.followers == '')
                return 0;
            return this.props.followers;
        }

        const checkFollowing = () => {
            if (this.props.followers == '')
                return 0;
            return this.props.following;
        }

        return(
            <div>
                <h3 id="username">{this.props.username}</h3>
                <FollowerCount
                    followers={checkFollower()}
                    following={checkFollowing()}
                />
                <hr />
                <div className="bio_div">
                    <p id="bio">{this.props.biography}</p>
                </div>
            </div>
        )
    }
}