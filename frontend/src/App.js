import React from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { LoginPage } from './components/pages/loginPage';
import { RegisterPage } from './components/pages/registerPage';

function App() {
    return (
        <Router>
            <>
                <Switch>
                    <Route path="/register">
                        <RegisterPage />
                    </Route>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                </Switch>
            </>
        </Router>
    );
}

export default App;
