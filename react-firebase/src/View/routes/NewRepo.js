import React, {Component} from "react";
import {insertRepository} from "../../Model/FirebaseHandler";
import * as K from '../../Constants'
import {CreateRepoAction} from "../NewRepoComponents/CreateRepoAction";


const NewRepo = ({ history }) => {

    return(
        <div>
           <CreateRepoAction history={history}/>
        </div>
    );
};

export default NewRepo;