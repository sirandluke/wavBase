import React from "react";
import UserSearchResults from '../components/UserSearchResults';
import RepoSearchResults from '../components/RepoSearchResults';

const ResultsInterface = (input) => {
    return (
        <div>
            <Results id={input}/>
        </div>
    );
}

class Results extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.id}</h2>
                <h2>Users</h2>
            </div>
        );
    }
}

export default ResultsInterface;