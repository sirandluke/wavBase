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
import {SnapshotList} from "./View/RepositoryPageComponents/SnapshotList";
import ResetPassword from './View/routes/ResetPassword';

//import RepositoryListContainer from "./View/routes/RepositoryListContainer";

function App() {
    return (

        <AuthProvider>
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/reset_password" component={ResetPassword}/>
                        <PrivateRoute path="/" component={PersonalHome}/>
                    </Switch>
                    <PrivateRoute exact path="/" component={RepositoryList}/>
                    <PrivateRoute exact path="/newrepo" component={NewRepo}/>
                    <PrivateRoute exact path="/profile" component={Profile}/>
                    <PrivateRoute path='/search_result' component={ResultsInterface}/>
                    <PrivateRoute exact path='/search_result' component={UserSearchResult}/>
                    <PrivateRoute exact path='/search_result/repositories'
                                  component={RepoSearchResult}/>
                    <PrivateRoute exact path='/search_result/tags'
                                  component={TagsSearchResult}/>
                    <PrivateRoute path={'/user/:user_id'} component={RepositoryList}/>
                    <PrivateRoute path={"/repo/:repo_id"} component={Repository}/>
                    <PrivateRoute exact path={'/repo/:repo_id'} component={SnapshotList} />
                    <PrivateRoute exact path={"/repo/:repo_id/snapshot/:snap_id"} component={Snapshot}/>
                    {/*<img src={sine_wave_1} style={{*/}
                    {/*    width: "100%",*/}
                    {/*    float: 'bottom',*/}
                    {/*    zIndex: "-99",*/}
                    {/*    position: "relative",*/}
                    {/*    marginTop: '1rem'*/}
                    {/*}}/>*/}
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
