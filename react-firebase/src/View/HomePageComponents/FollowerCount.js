import React,{Component} from "react";
import { Redirect } from "react-router-dom";

export class FollowerCount extends Component{
    render(){

        return(
            <div>
                <p>{this.props.followers} followers · {this.props.following} following</p>
            </div>
        )
    }
}