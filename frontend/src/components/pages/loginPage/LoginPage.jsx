import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApiCommunicator } from '../../../api/userApiCommunicator';
import { tokenFunctions as tokens } from '../../../localTokens/tokenFunctions';

import { PageInput } from '../../pageInput';

import './loginPage.css';

export function LoginPage() {
	const [username, setUsername] = useState('');
	const [usernameError, setUsernameError] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [userid, setUserid] = useState();
	const hour = 60 * 60 * 1000;

	const navigate = useNavigate();

	const onSignUpClicked = () => {
		navigate('/register');
	};

	const onLoginClicked = () => {
		let flag = true;

		if (!username) {
			setUsernameError('Username cannot be left empty');
			flag = false;
		} else setUsernameError('');

		if (!password) {
			setPasswordError('Password cannot be left empty');
			flag = false;
		} else setPasswordError('');

		if (flag) {
			userApiCommunicator.login(username, password).then(response => {
				if (response['redirect']) {
					let token = {
						userId: response.redirect,
						expireDate: Date.now() + hour,
					};
					tokens.setToken('userDetails', token);
					navigate('/user');
				} else if (response.msg['user']) setUsernameError(response.msg.user);
				else if (response.msg['password']) {
					setPasswordError(response.msg.password);
					// setUserid(response.msg.userid);
				}
			});
		}
	};

	const onResetClicked = () => {
		userApiCommunicator.updatePassword(userid);
	};

	const checkAutoLogin = () => {
		let token = tokens.getToken('userDetails');
		if (!token) return;
		tokens.removeToken('userDetails');
		let todaysDate = Date.now();
		if (todaysDate > token.expireDate) return;
		token.expireDate = Date.now() + hour;
		tokens.setToken('userDetails', token);
		alert('User is already logged in');
		navigate('/user');
	};

	useEffect(() => {
		checkAutoLogin();
	}, []);

	return (
		<div className='login-page-container'>
			<div className='login-page-header'>
				<span className='login-page-title'>Login</span>
			</div>
			<div className='login-page-form'>
				<PageInput
					title='Username'
					placeholder='Enter username'
					value={username}
					onChange={setUsername}
					error={usernameError}
				/>
				<PageInput
					type='password'
					placeholder='Enter password'
					title='Password'
					value={password}
					onChange={setPassword}
					error={passwordError}
				/>
			</div>
			<div className='login-page-submit'>
				<button className='login-page-button' onClick={onLoginClicked}>
					Login
				</button>
				<button className='login-page-button' onClick={onSignUpClicked}>
					Sign Up
				</button>
				{userid && (
					<button className='login-page-button' onClick={onResetClicked}>
						Reset Password
					</button>
				)}
			</div>
		</div>
	);
}
