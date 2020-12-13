import React, {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import db from "../../Model/base";
import './ResultsInterface.css';

function ResultsInterface(props) {

    if (document.getElementById("repoOption") != null && document.getElementById("tagOption") != null &&
        document.getElementById("userOption") != null){

        document.getElementById("repoOption").className = 'searchOption';
        document.getElementById("tagOption").className = 'searchOption';
        document.getElementById("userOption").className = 'searchOption';
        if (window.location.href.endsWith('/repositories'))
            document.getElementById("repoOption").className += " active";
        else if (window.location.href.endsWith('/search_result'))
            document.getElementById("userOption").className += " active";
        else if (window.location.href.endsWith('/tags'))
            document.getElementById("tagOption").className += " active";
    }
    return (
        <div>
            {/*<DropdownButton id="dropdown-basic-button" title="Options">*/}
            {/*    <Dropdown.Item as="button"><Link to='/search_result'>Users</Link></Dropdown.Item>*/}
            {/*    <Dropdown.Item as="button"><Link*/}
            {/*        to='/search_result/repositories'>Repositories</Link></Dropdown.Item>*/}
            {/*    <Dropdown.Item as="button"><Link to='/search_result/tags'>Tags</Link></Dropdown.Item>*/}
            {/*</DropdownButton>*/}

            <table id="sideNav">
                <tbody>
                <tr><Link to='/search_result/repositories' id="repoOption" className='searchOption'>Repositories</Link></tr>
                <br/>
                <tr><Link to='/search_result' id="userOption" className='searchOption'>Users</Link></tr>
                <br/>
                <tr><Link to='/search_result/tags' id="tagOption" className='searchOption'>Tags</Link></tr>
                </tbody>
                </table>
        </div>
    );
}

export default ResultsInterface;