import React,{Component} from "react";
import { Redirect } from "react-router-dom";

export class UsernameBio extends Component{
    render(){
        return(
            <div>
                <h3>{this.props.username}</h3>
                <p>{this.props.biography}</p>
            </div>
        )
    }
}
