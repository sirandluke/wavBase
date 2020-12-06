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
import TestModule from "./View/routes/TestModule";

function App() {

    //const search_result_routes = search_result_paths();
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <PrivateRoute path="/" component={PersonalHome}/>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;