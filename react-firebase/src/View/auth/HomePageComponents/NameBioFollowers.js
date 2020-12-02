import React,{Component} from "react";
import { Redirect } from "react-router-dom";
import {FollowerCount} from "./FollowerCount";

export class NameBioFollowers extends Component{
    render(){
        return(
            <div>
                <h3>{this.props.username}</h3>
                <FollowerCount
                    followers={this.props.followers}
                    following={this.props.following}
                />

                <p>{this.props.biography}</p>
            </div>
        )
    }
}