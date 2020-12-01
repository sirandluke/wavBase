import React from "react";
import {CreateRepoAction} from "./CreateRepoAction";
import * as K from '../../Constants'


const NewRepo = ({ history }) => {

    return(
        <div>
            <CreateRepoAction history={history} />
        </div>
    );
};

export default NewRepo;