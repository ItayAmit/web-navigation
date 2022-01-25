import { useState } from 'react';

import { LoginPageInput } from '../../loginPageInput';

import './loginPage.css';

export function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="login-page-container">
            <div className="login-page-header">
                <span className="login-page-title">Login</span>
            </div>
            <div className="login-page-form">
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
            <div className="login-page-submit">
                <button className="login-page-submit-button">Login</button>
            </div>
        </div>
    );
}
