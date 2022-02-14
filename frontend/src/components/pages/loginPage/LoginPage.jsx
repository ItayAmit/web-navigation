import { useState } from 'react';
import { userApiCommunicator } from '../../../api/userApiCommunicator';

import { PageInput } from '../../pageInput';

import './loginPage.css';

export function LoginPage() {
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const onLoginClicked = () => {
        let flag = true;

        if (!username) {
            setUsernameError('Username cannot be left empty');
            flag = false;
        } else {
            setUsernameError('');
        }

        if (!password) {
            setPasswordError('Username cannot be left empty');
            flag = false;
        } else {
            setPasswordError('');
        }

        if (flag) userApiCommunicator.login(username, password);
    };

    return (
        <div className="login-page-container">
            <div className="login-page-header">
                <span className="login-page-title">Login</span>
            </div>
            <div className="login-page-form">
                <PageInput
                    title="Username"
                    placeholder="Enter username"
                    value={username}
                    onChange={setUsername}
                    error={usernameError}
                />
                <PageInput
                    type="password"
                    placeholder="Enter password"
                    title="Password"
                    value={password}
                    onChange={setPassword}
                    error={passwordError}
                />
            </div>
            <div className="login-page-submit">
                <button
                    className="login-page-submit-button"
                    onClick={onLoginClicked}>
                    Login
                </button>
            </div>
        </div>
    );
}
