import { useState } from 'react';
import { userApiCommunicator } from '../../../api/userApiCommunicator';

import { LoginPageInput } from '../../loginPageInput';

import './registerPage.css';

export function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onRegisterClicked = () => {
        userApiCommunicator.register(username, password);
    };

    return (
        <div className="register-page-container">
            <div className="register-page-header">
                <span className="register-page-title">Register</span>
            </div>
            <div className="register-page-form">
                <LoginPageInput
                    title="Username"
                    placeholder="Enter username"
                    value={username}
                    onChange={setUsername}
                />
                <LoginPageInput
                    type="password"
                    placeholder="Enter password"
                    title="Password"
                    value={password}
                    onChange={setPassword}
                />
            </div>
            <div className="register-page-submit">
                <button
                    className="register-page-submit-button"
                    onClick={onRegisterClicked}>
                    Register
                </button>
            </div>
        </div>
    );
}
