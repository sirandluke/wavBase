import React, {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import db from "../../Model/TODELETE_base";

function ResultsInterface(props) {
    return (
        <div>
            <DropdownButton id="dropdown-basic-button" title="Options">
                <Dropdown.Item as="button"><Link to='/search_result'>Users</Link></Dropdown.Item>
                <Dropdown.Item as="button"><Link
                    to='/search_result/repositories'>Repositories</Link></Dropdown.Item>
                <Dropdown.Item as="button"><Link to='/search_result/tags'>Tags</Link></Dropdown.Item>
            </DropdownButton>
        </div>
    );
}

export default ResultsInterface;