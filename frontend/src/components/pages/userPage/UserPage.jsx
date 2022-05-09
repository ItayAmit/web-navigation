import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApiCommunicator } from '../../../api/userApiCommunicator';
import { tokenFunctions as tokens } from '../../../localTokens/tokenFunctions';
import logout from '../../../images/logout.png';
import navigation from '../../../images/navigation.png';
import socialNetwork from '../../../images/socialnetwork.jpg';

import './userPage.css';

export function UserPage() {
	const navigate = useNavigate();
	const [firstname, setFirstname] = useState('Guest');
	useEffect(() => {
		const token = tokens.getToken('userDetails');
		if (!token) {
			alert('User has timed out. Please log in again');
			navigate('/login');
		}
		const userId = token.userId;
		userApiCommunicator.load(userId).then(response => {
			if (response['user']) setFirstname(response.user.firstname);
		});
	}, []);
	const onLogoutClicked = () => {
		tokens.removeToken('userDetails');
		navigate('/login');
	};
	const onNavigateClicked = () => {
		navigate('/navigate');
	};
	const onBrowseClicked = () => {
		navigate('/browse');
	};
	const onAddSiteClicked = () => {
		navigate('/addsite');
	};
	return (
		<div className='user-page-container'>
			<div className='user-page-header'>
				<span className='user-page-title'>Welcome back {firstname}</span>
				<img
					className='user-page-logout'
					src={logout}
					onClick={onLogoutClicked}
				/>
			</div>
			<div className='user-page-body'>
				<div className='user-page-body-navigation'>
					<button
						className='user-page-body-navigation-button'
						onClick={onNavigateClicked}
					>
						Navigate
					</button>
					<button
						className='user-page-body-navigation-button'
						onClick={onBrowseClicked}
					>
						Browse
					</button>
					<button
						className='user-page-body-navigation-button'
						onClick={onAddSiteClicked}
					>
						Add Site
					</button>
				</div>
			</div>
			<div className='user-page-images'>
				<img className='user-page-image' src={navigation} />
				<img className='user-page-image' src={socialNetwork} />
			</div>
		</div>
	);
}
