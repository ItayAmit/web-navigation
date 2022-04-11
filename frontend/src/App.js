import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { LoginPage } from './components/pages/loginPage';
import { RegisterPage } from './components/pages/registerPage';
import { UserPage } from './components/pages/userPage';
import { SiteAddPage } from './components/pages/siteAddPage';

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/login'>
					<LoginPage />
				</Route>
				<Route path='/register'>
					<RegisterPage />
				</Route>
				<Route path='/user/:id'>
					<UserPage />
				</Route>
				<Route path='/addsite'>
					<SiteAddPage />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
