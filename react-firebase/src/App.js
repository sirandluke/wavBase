import React from 'react';
import { BrowserRouter as Router, Route }from "react-router-dom";

import Home from "./View/routes/Home";
import PersonalHome from "./View/routes/PersonalHome";
import Login from "./View/routes/Login";
import Register from "./View/routes/Register";
import NewRepo from "./View/routes/NewRepo";
import Repository from "./View/routes/Repository";
import Profile from "./View/routes/Profile";

import PrivateRoute from "./View/auth/PrivateRoute";
import { AuthProvider} from "./View/auth/Auth";

import './App.css';

function App() {
    const repo_path = ['/a'];

    return(
        <AuthProvider>
            <Router>
                <div>
                    <PrivateRoute exact path="/" component={ PersonalHome } />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <PrivateRoute exact path="/newrepo" component={NewRepo} />
                    <PrivateRoute exact path="/repository" component={Repository} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <Route exact path={repo_path} component={Repository}/>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
