import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { userApiCommunicator } from '../../../api/userApiCommunicator';
import './userPage.css';

export function UserPage() {
    const { id } = useParams();
    const [firstname, setFirstname] = useState('Guest');
    userApiCommunicator.load(id).then(response => {
        if (response['user']) {
            setFirstname(response.user.firstname);
        }
    });
    return (
        <div className="user-page-container">
            <div className="user-page-header">
                <span className="user-page-title">
                    Welcome back {firstname}
                </span>
            </div>
        </div>
    );
}
