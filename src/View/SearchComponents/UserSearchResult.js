import React, {useEffect, useState, useHistory} from "react";
//import db from "../../Database_config";
import {FindUsers} from "../../BackendFunctions";
import UserDisplayComponent from "../SearchResultsComponents/UserDisplayComponent";
import db from "../../Model/base";
import "./SearchResult.css";

function UserSearchResult(props) {

    let search_input = document.getElementById('search_input').value;
    const [users, setUsers] = useState(0);

    const uid = db.auth().currentUser.uid;
    //console.log('search', search_input);


    useEffect(() => {
        console.log('listen to user list');
        if (!users) {
            FindUsers(uid).then(users_snapshot => {
                console.log(users_snapshot);
                let users_list = [];
                for (let user in users_snapshot) {
                    //console.log(1);
                    users_list.push({...users_snapshot[user], key: user});
                }
                setUsers(users_list);
            });
        }
        return () => {
            console.log('stop listen to user list');
        }
    }, [users]);

    /*{users && users.map((user, key) => (
        (user.val().username.toLowerCase().includes(search_input.toLowerCase())) ? <button>{user.val().username}</button> : <></>
    ))}*/

    //<button id={key}><Link to={'/user/' + user.key}>{user.username}</Link></button>
    /*if (users) {
        users.map((user, key) => {
           console.log(user.username);
        } )
    }*/
    return (
        <div className="searchResult">
            <h2 className="searchTitle">User Search Result</h2>
            {users && users.map((user, key) => (
                (user.username && user.username.toLowerCase().includes(search_input.toLowerCase()) && (user.key !== uid)) ?
                    <UserDisplayComponent id={key} uid={user.key} username={user.username}/> : <></>
            ))}
        </div>
    );
}

export default UserSearchResult;