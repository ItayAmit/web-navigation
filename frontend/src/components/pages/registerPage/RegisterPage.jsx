import { useState } from 'react';

import { RegisterPageInput } from './registerPageInput';

import './registerPage.css';

export function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="register-page-container">
            <div className="register-page-header">
                <span className="register-page-title">Register</span>
            </div>
            <div className="register-page-form">
                <RegisterPageInput
                    title="Username"
                    placeholder="Enter username"
                    value={username}
                    onChange={setUsername}
                />
                <RegisterPageInput
                    type="password"
                    placeholder="Enter password"
                    title="Password"
                    value={password}
                    onChange={setPassword}
                />
            </div>
            <div className="register-page-submit">
                <button className="register-page-submit-button">
                    Register
                </button>
            </div>
        </div>
    );
}
