import React,{Component} from "react";
import { Redirect } from "react-router-dom";
import {FollowerCount} from "./FollowerCount";
import "./NameBioFollowers.css"

export class NameBioFollowers extends Component{
    render(){

        const checkFollower = () => {
            if (this.props.followers == '' || !Number.isInteger(this.props.followers))
                return 0;
            return this.props.followers;
        }

        const checkFollowing = () => {
            if (this.props.followers == '' || !Number.isInteger(this.props.following))
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