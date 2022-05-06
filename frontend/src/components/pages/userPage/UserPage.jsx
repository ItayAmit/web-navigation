import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApiCommunicator } from '../../../api/userApiCommunicator';
import { tokenFunctions as tokens } from '../../../localTokens/tokenFunctions';
import './userPage.css';

export function UserPage() {
	const navigate = useNavigate();
	const [firstname, setFirstname] = useState('Guest');
	useEffect(() => {
		const token = tokens.getToken('userDetails');
		if (!token) navigate('/login');
		const userId = token.userId;
		userApiCommunicator.load(userId).then(response => {
			if (response['user']) setFirstname(response.user.firstname);
		});
	}, []);
	const onNavigateClicked = () => {
		navigate('/navigate');
	};
	const onBrowseClicked = () => {
		navigate('/browse');
	};
	const onAddSiteClicked = () => {
		navigate('/addsite');
	};
	const onRateSiteClicked = () => {
		navigate('/rate');
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
					<button
						className='user-page-body-navigation-button'
						onClick={onRateSiteClicked}
					>
						Rate Site
					</button>
				</div>
			</div>
		</div>
	);
}
