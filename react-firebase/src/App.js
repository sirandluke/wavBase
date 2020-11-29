import React from 'react';
import { BrowserRouter as Router, Route }from "react-router-dom";

import Home from "./View/routes/Home";
import Login from "./View/routes/Login";
import Register from "./View/routes/Register";
import NewRepo from "./View/routes/NewRepo";


import PrivateRoute from "./View/auth/PrivateRoute";
import { AuthProvider} from "./View/auth/Auth";

import './App.css';
import Repository from "./View/routes/Repository";

function App() {
    return(
        <AuthProvider>
            <Router>
                <div>
                    <PrivateRoute exact path="/" component={ Home } />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <PrivateRoute exact path="/newrepo" component={NewRepo} />
                    <Route exact path={"/repo"} component={Repository} />

                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
