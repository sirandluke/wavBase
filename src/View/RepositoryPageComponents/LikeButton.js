import React, {Component, useContext} from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import db from '../../Model/base';

class LikeButton extends Component {
    //pass repo ID in as a prop when using this component on the repo page
    constructor(props) {
        super(props);

        this.likeRepo = this.likeRepo.bind(this);
        this.unlikeRepo = this.unlikeRepo.bind(this);
        this.getButtonText = this.getButtonText.bind(this);
        this.getCurrentLikeCount = this.getCurrentLikeCount.bind(this);
        this.getButtonFunction = this.getButtonFunction.bind(this);

        this.state = {
            likes: this.getCurrentLikeCount((l)=>{}),
            liked: true,
            buttonText: "",
            buttonFunction: ()=>{}
        }

        //update button state with current information
        this.alreadyLiked((isLiked) => {
            let newState = this.state;
            newState.liked = isLiked;
            newState.buttonText = this.getButtonText(isLiked);
            newState.buttonFunction = this.getButtonFunction(isLiked);
            this.setState(newState);
        });
      }

    //update the DB with a new like
    likeRepo() {
        //this.props.repo is the repository ID
        const ref = db.database().ref();
        //update repo like count
        const repoLikesRef = ref.child("repositories/" + this.props.repo + "/repo_likes");
        const currentUID = db.auth().currentUser.uid;
        this.getCurrentLikeCount((lc) => {
            repoLikesRef.set(lc + 1);
            //update button count state
            let newState = this.state;
            newState.likes = lc + 1;
            this.setState(newState);
        });
        
        //push new repo_like with current user id to the current repo
        const repoLikedUsersRef = ref.child("repositories/" + this.props.repo + "/liked_users");
        repoLikedUsersRef.push({
            uid: currentUID,
        });
        //push repo id to user's liked repo
        const userLikesRef = ref.child("users/"+ currentUID + "/likes");
        userLikesRef.push({
            repo_id: this.props.repo
        });

        //update button states
        let newState = this.state;
        newState.buttonText = "Liked !";
        newState.buttonFunction = this.unlikeRepo;
        this.setState(newState);

    }


    unlikeRepo() {
        const ref = db.database().ref();
        //update repo like count
        const repoLikesRef = ref.child("repositories/" + this.props.repo + "/repo_likes");
        const currentUID = db.auth().currentUser.uid;
        this.getCurrentLikeCount((lc) => {
            repoLikesRef.set(lc - 1);
            //update button count state
            let newState = this.state;
            newState.likes = lc - 1;
            this.setState(newState);
        });

        //remove repo_like with current user id from the current repo
        const repoLikedUsersRef = ref.child("repositories/" + this.props.repo + "/liked_users");
        repoLikedUsersRef.once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                if (childSnapshot.child("uid").val() === currentUID) {
                    childSnapshot.ref.remove();
                }
            })
        });
        //remove repo id in user's liked repos
        const userLikesRef = ref.child("users/"+ currentUID + "/likes");
        userLikesRef.once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                if (childSnapshot.child("repo_id").val() === this.props.repo) {
                    childSnapshot.ref.remove();
                }
            })
        });

        //update button states
        let newState = this.state;
        newState.buttonText = "Like";
        newState.buttonFunction = this.likeRepo;
        this.setState(newState);

    }

    // returns boolean depending on if the current user already liked this repo
    alreadyLiked(callback) {
        const ref = db.database().ref();
        const currentUID = db.auth().currentUser.uid;
        const userLikesRef = ref.child("users/"+ currentUID + "/likes");
        let toReturn = false;
        userLikesRef.once("value", (snapshot) =>{
            snapshot.forEach((childSnapshot) => {
                if (childSnapshot.child("repo_id").val() == this.props.repo) {
                    toReturn = true;
                }
            });
            // if none of the repos in our liked list match the current one, return false
            callback(toReturn);
        });
    }

    //gets current like count of repo and updates the state
    getCurrentLikeCount(callback) {
        const ref = db.database().ref();
        const repoLikesRef = ref.child("repositories/" + this.props.repo + "/repo_likes");
        let currentLikeCount = 0;
        repoLikesRef.once("value", (snapshot) => {
            currentLikeCount = snapshot.val();
            let newState = this.state;
            newState.likes = currentLikeCount;
            this.setState(newState);
            callback(currentLikeCount);
        });
    }

    // returns "Like" or "Liked !" depending on if the user has already liked the repo
    getButtonText(isLiked) {
        if (isLiked) {
            return("Liked !");
        } else {
            return("Like");
        }
        
    }

    //return reference to likeRepo or unlikeRepo depending on whether or not the user has liked the repo
    getButtonFunction(isLiked) {
        if (isLiked) {
            return this.unlikeRepo;
        } else {
            return this.likeRepo;
        }
    }

    render() {
        return(
            <div>
                <button onClick={this.state.buttonFunction}>{this.state.buttonText} ({this.state.likes} Likes)</button>
            </div>
        );
    }
}

export default LikeButton;