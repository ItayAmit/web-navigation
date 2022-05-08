import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApiCommunicator } from '../../../api/userApiCommunicator';

import { PageInput } from '../../pageInput';

import './registerPage.css';

export function RegisterPage() {
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [usernameError, setUsernameError] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [repassword, setRepassword] = useState('');
	const [repasswordError, setRepasswordError] = useState('');
	const [firstname, setFirstname] = useState('');
	const [firstnameError, setFirstnameError] = useState('');
	const [lastname, setLastname] = useState('');
	const [lastnameError, setLastnameError] = useState('');
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');

	const validateEmail = email => {
		let es = /\S+@\S+\.\S+/;
		return es.test(email);
	};

	const onRegisterClicked = () => {
		let flag = true;

		if (!username) {
			setUsernameError('Username cannot be left empty');
			flag = false;
		} else {
			setUsernameError('');
		}

		if (password.length < 8) {
			setPasswordError('Password must contain at least 8 characters');
			setRepasswordError('');
			flag = false;
		} else if (repassword !== password) {
			setRepasswordError('Confirm password must be the same as password');
			setPasswordError('');
			flag = false;
		} else {
			setPasswordError('');
			setRepasswordError('');
		}

		if (!firstname) {
			setFirstnameError('First name cannot be left empty');
			flag = false;
		} else {
			setFirstnameError('');
		}

		if (!lastname) {
			setLastnameError('Last name cannot be left empty');
			flag = false;
		} else {
			setLastnameError('');
		}

		if (!email) {
			setEmailError('Email cannot be left empty');
			flag = false;
		} else if (!validateEmail(email)) {
			setEmailError('Email is not in the correct format');
			flag = false;
		} else {
			setEmailError('');
		}

		if (flag) {
			userApiCommunicator
				.register(username, password, firstname, lastname, email)
				.then(response => {
					// console.log(response);
					if (response['redirect']) navigate('/user');
					if (response.msg['user']) setUsernameError(response.msg.user);
					if (response.msg['email']) setEmailError(response.msg.email);
				});
		}
	};

	return (
		<div className='register-page-container'>
			<div className='register-page-header'>
				<span className='register-page-title'>Register</span>
			</div>
			<div className='register-page-form'>
				<PageInput
					title='Username'
					placeholder='Enter username'
					value={username}
					onChange={setUsername}
					error={usernameError}
				/>
				<PageInput
					type='password'
					title='Password'
					placeholder='Enter password'
					value={password}
					onChange={setPassword}
					error={passwordError}
				/>
				<PageInput
					type='password'
					title='Confirm Password'
					placeholder='Re-enter password'
					value={repassword}
					onChange={setRepassword}
					error={repasswordError}
				/>
				<PageInput
					title='First Name'
					placeholder='Enter first name'
					value={firstname}
					onChange={setFirstname}
					error={firstnameError}
				/>
				<PageInput
					title='Last Name'
					placeholder='Enter last name'
					value={lastname}
					onChange={setLastname}
					error={lastnameError}
				/>
				<PageInput
					title='Email'
					placeholder='Enter email'
					value={email}
					onChange={setEmail}
					error={emailError}
				/>
			</div>
			<div className='register-page-submit'>
				<button className='register-page-button' onClick={onRegisterClicked}>
					Register
				</button>
			</div>
		</div>
	);
}
