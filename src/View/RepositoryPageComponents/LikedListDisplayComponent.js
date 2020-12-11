import React, {useEffect, useState} from "react";
import {AddId, ParseIds} from "../GlobalComponent/ParseId";
import {FindUsers} from "../../BackendFunctions";

function LikedListDisplayComponent(props) {
    const liked = props.likes;
    let individual_user_id = [];
    if (props.likes) {
        individual_user_id = ParseIds(liked);
    }

    const [username_list, setUsernameList] = useState(0);


    useEffect(() => {
        console.log('listen to liked list');
        if (individual_user_id !== []) {
            let tmp_username_list = '';
            FindUsers('').then(users => {
               individual_user_id.forEach(id => {
                   tmp_username_list = AddId(tmp_username_list, users[id].username);
                   console.log(users[id].username, "liked this repo");
               })
                setUsernameList(tmp_username_list);
               //console.log(tmp_username_list);
            });
        }
        return () => {
            console.log('stop listen to liked list');
        }
    }, [props.likes]);

    return (
        <div>
            <p>Liked by {username_list}</p>
        </div>
    );
}

export default LikedListDisplayComponent