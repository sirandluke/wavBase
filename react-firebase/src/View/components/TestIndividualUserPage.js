import React from "react";
import {useParams} from "react-router-dom";

const TestIndividualUserPage = (props) =>{
    const {user_id} = useParams();
    return(
        <div>
            <h2>snapshot</h2>
            <h2>{user_id}</h2>
        </div>
    );
}

export default TestIndividualUserPage;