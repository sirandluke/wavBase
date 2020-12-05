import React, {useState} from "react";
import {useHistory} from "react-router-dom";

function TestProfile(props) {
    const history = useHistory();
    const [current_user, setUser] = useState(props.user || []);

    return (
        <div>
            <h2>Profile Worked!</h2>
            <img id={'profile_image'} src={''} width={150} height={150}/>
        </div>
    );
}

export default TestProfile;