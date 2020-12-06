import React from "react";
import {useParams} from "react-router-dom";

const TestIndividualRepoPage = () =>{
    const {repo_id} = useParams();
    return(
        <div>
            <h2>snapshot</h2>
            <h2>{repo_id}</h2>
        </div>
    );
}

export default TestIndividualRepoPage;