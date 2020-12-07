import React,{Component} from "react";
import { Redirect } from "react-router-dom";
import {FollowerCount} from "./FollowerCount";

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
                <h3 style={{textAlign:'center', fontSize:'24px'}}>{this.props.username}</h3>
                <FollowerCount
                    followers={checkFollower()}
                    following={checkFollowing()}
                />
                <p>{this.props.biography}</p>
            </div>
        )
    }
}