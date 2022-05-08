import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { LoginPage } from './components/pages/loginPage';
import { RegisterPage } from './components/pages/registerPage';
import { UserPage } from './components/pages/userPage';
import { SiteAddPage } from './components/pages/siteAddPage';
import { BrowsePage } from './components/pages/browsePage';

function App() {
	return (
		<Router>
			<Routes>
				<Route exact path='/' element={<LoginPage />} />
				<Route exact path='/login' element={<LoginPage />} />
				<Route exact path='/register' element={<RegisterPage />} />
				<Route exact path='/user' element={<UserPage />} />
				<Route exact path='/addsite' element={<SiteAddPage />} />
				<Route exact path='/browse' element={<BrowsePage />} />
			</Routes>
		</Router>
	);
}

export default App;
