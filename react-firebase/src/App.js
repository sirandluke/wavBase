import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Home from "./View/routes/Home";
import PersonalHome, {search_input} from "./View/routes/PersonalHome";
import Login from "./View/routes/Login";
import Register from "./View/routes/Register";
import NewRepo from "./View/routes/NewRepo";
import Repository from "./View/routes/Repository";
import Profile from "./View/routes/Profile";

import PrivateRoute from "./View/auth/PrivateRoute";
import {AuthProvider} from "./View/auth/Auth";

import './App.css';
import ResultsInterface, {search_result_paths} from "./View/routes/ResultsInterface";
import TestProfile from "./View/routes/TestProfile";
import TestRepository from "./View/routes/TestRepository";

function App() {

    //const search_result_routes = search_result_paths();
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <PrivateRoute path="/" component={PersonalHome}/>
                    <PrivateRoute exact path="/" component={TestRepository}/>
                    <PrivateRoute exact path="/profile" component={Profile}/>
                    <PrivateRoute exact path='/search_result' component={ResultsInterface}/>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;