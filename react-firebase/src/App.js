import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";

import Home from "./View/routes/Home";
import PersonalHome from "./View/routes/PersonalHome";
import Login from "./View/routes/Login";
import Register from "./View/routes/Register";
import NewRepo from "./View/routes/NewRepo";
import Repository from "./View/routes/Repository";
import Profile from "./View/routes/Profile";
import Snapshot from "./View/routes/Snapshot";
import ResultsInterface from "./View/routes/ResultsInterface";

import PrivateRoute from "./View/auth/PrivateRoute";
import {AuthProvider} from "./View/auth/Auth";

import './App.css';

import SearchResults from "./View/routes/SearchResults";
import NavBar from "./View/NavBarComponents/NavBar";
import RepositoryList from "./View/HomePageComponents/RepositoryList";
import sine_wave_1 from "./Images/sine_wave_1.png";
import UserSearchResult from "./View/SearchComponents/UserSearchResult";
import RepoSearchResult from "./View/SearchComponents/RepoSearchResult";
import TagsSearchResult from "./View/SearchComponents/TagsSearchResult";

//import RepositoryListContainer from "./View/routes/RepositoryListContainer";

function App() {
    return (

        <AuthProvider>
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <PrivateRoute path="/" component={PersonalHome}/>
                    </Switch>
                    <img src={sine_wave_1} style={{
                        width: "100%",
                        float: 'bottom',
                        zIndex: "-99",
                        position: "relative",
                        marginTop: '1rem'
                    }}/>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
