import React from "react";
import UserSearchResults from '../components/UserSearchResults';
import RepoSearchResults from '../components/RepoSearchResults';

const ResultsInterface = (results) => {
    return (
        <div>
            <Results results={results}/>
        </div>
    );
}

export function Results(props) {
    let result_list = [];
    props.results.forEach((entry) => {
        result_list.push(
            <button>{entry}</button>
        );
    });

    return (
        <div>
            {result_list}
        </div>
    );

}

export default ResultsInterface;