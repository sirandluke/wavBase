import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Home from "./routes/Home";
import PersonalHome, {search_input} from "./routes/PersonalHome";
import Login from "./routes/Login";
import Register from "./routes/Register";
import NewRepo from "./routes/NewRepo";
import Repository from "./routes/Repository";
import Profile from "./routes/Profile";

import PrivateRoute from "./View/auth/PrivateRoute";
import {AuthProvider} from "./View/auth/Auth";

import './App.css';
import ResultsInterface, {search_result_paths} from "./routes/ResultsInterface";

function App() {

    //const search_result_routes = search_result_paths();
    return (
        <AuthProvider>
            <div>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <PrivateRoute exact path="/" component={PersonalHome}/>
                <PrivateRoute exact path="/repository" component={Repository}/>
                <PrivateRoute exact path="/profile" component={Profile}/>
                <PrivateRoute path='/search_result' component={ResultsInterface}/>
            </div>
        </AuthProvider>
    );
}

export default App;