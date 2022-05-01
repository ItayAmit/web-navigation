import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApiCommunicator } from '../../../api/userApiCommunicator';
import { tokenFunctions as tokens } from '../../../localTokens/tokenFunctions';
import './userPage.css';

export function UserPage() {
	const navigate = useNavigate();
	const [firstname, setFirstname] = useState('Guest');
	const getUser = userId => {
		userApiCommunicator.load(userId).then(response => {
			if (response['user']) setFirstname(response.user.firstname);
		});
	};
	useEffect(() => {
		const token = tokens.getToken('userDetails');
		if (!token) navigate('/login');
		const userId = token.userId;
		getUser(userId);
	}, []);
	const onAddSiteClicked = () => {
		navigate('/addsite');
	};
	return (
		<div className='user-page-container'>
			<div className='user-page-header'>
				<span className='user-page-title'>Welcome back {firstname}</span>
			</div>
			<div className='user-page-body'>
				<div className='user-page-body-navigation'>
					<button
						className='user-page-body-navigation-button'
						onClick={onAddSiteClicked}
					>
						Add Site
					</button>
				</div>
			</div>
		</div>
	);
}
