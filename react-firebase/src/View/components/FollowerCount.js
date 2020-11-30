import React,{Component} from "react";
import { Redirect } from "react-router-dom";
import logo from "../../Images/wavBase_logo.png";

export class FollowerCount extends Component{
    render(){

    return(
            <div>
                <img src={this.props.profile_picture} c />
                <p>{this.props.followers} followers · {this.props.following} following</p>
            </div>
        )
    }
}
