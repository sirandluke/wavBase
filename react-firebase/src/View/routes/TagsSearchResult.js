import React, {useEffect, useState} from "react";

/*
const [repos, setRepos] = useState(props.repos || []);

let search_input = search_input;

/!*function findMatchingUsers(query, callback) {
    let uids = [];
    const ref = db.database().ref();
    ref.child("users").on("value", (snapshot) => {
        snapshot.forEach((user) => {
            let uid = user.key;
            let username = user.val().username;
            if (username.toLowerCase().includes(query.toLowerCase())) {
                uids.push(user);
            }
        });
    });
    callback(uids);
}*!/

const findUsers = () => {
    let config = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    return fetch('http://localhost:8000/user_list', config)
        .then(response => response.json())
        .catch(error => console.log(error));
}

const findRepos = () => {
    let config = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    return fetch('http://localhost:8000/repo_list', config)
        .then(response => response.json())
        .catch(error => console.log(error));
}

useEffect(() => {
    if (!props.repos) {
        findRepos().then(repos_snapshot => {
            let repos_list = [];
            for (let repo in repos_snapshot) {
                repos_list.push({...repos_snapshot[repo], key: repo});
            }
            setRepos(repos_list);
        });


    }
    if (!props.users) {
        findUsers().then(users_snapshot => {
            let users_list = [];
            for (let user in users_list) {
                users_list.push({...users_snapshot[user], key: user});
            }
            setUsers(users_list);
        });


    }
});*/

function TagsSearchResult(props) {
    return (
        <div>
            <button>a</button>
        </div>
    );
}
export default TagsSearchResult;
