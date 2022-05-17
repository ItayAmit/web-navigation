import { useState, useEffect } from 'react';
import { siteApiCommunicator } from '../../../api/siteApiCommunicator';
import { userApiCommunicator } from '../../../api/userApiCommunicator';
import { keyApiCommunicator } from '../../../api/keyApiCommunicator';
import { tokenFunctions as tokens } from '../../../localTokens/tokenFunctions';
import { SiteCard } from '../../siteCard';
import { UserCard } from '../../userCard';
import './adminPage.css';
import { useNavigate } from 'react-router-dom';

export function AdminPage() {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = useState();
	const [hiddenUsers, setHiddenUsers] = useState();
	const [users, setUsers] = useState();
	const [sites, setSites] = useState();
	const [selectedSite, setSelectedSite] = useState();
	const [districts, setDistrics] = useState();
	const [seasons, setSeasons] = useState();
	const [difficulties, setDifficulties] = useState();
	const [distances, setDistances] = useState();
	const [durations, setDurations] = useState();
	const [types, setTypes] = useState();
	const [del, setDel] = useState(false);

	useEffect(() => {
		keyApiCommunicator.getValuesFromKey('districts').then(response => {
			setDistrics(response.districts);
		});
		keyApiCommunicator.getValuesFromKey('seasons').then(response => {
			setSeasons(response.seasons);
		});
		keyApiCommunicator.getValuesFromKey('difficulties').then(response => {
			setDifficulties(response.difficulties);
		});
		keyApiCommunicator.getValuesFromKey('distances').then(response => {
			setDistances(response.distances);
		});
		keyApiCommunicator.getValuesFromKey('durations').then(response => {
			setDurations(response.durations);
		});
		keyApiCommunicator.getValuesFromKey('types').then(response => {
			setTypes(response.types);
		});
		userApiCommunicator.loadAll().then(response => {
			setHiddenUsers(response.users);
		});
		setDel(true);
		const userId = tokens.getToken('userDetails').userId;
		userApiCommunicator.load(userId).then(response => {
			setCurrentUser(response.user);
		});
	}, []);

	useEffect(() => {
		if (del) {
			siteApiCommunicator.find().then(response => {
				setSites(response.sites);
			});
			setDel(false);
		}
	}, [del]);

	useEffect(() => {
		if (!(hiddenUsers && currentUser)) return;
		setUsers(hiddenUsers.filter(user => user._id !== currentUser._id));
	}, [hiddenUsers, currentUser]);

	const setSelectedCard = site => {
		setSelectedSite(site);
	};

	const onDeleteClicked = () => {
		siteApiCommunicator.remove(selectedSite._id);
		setDel(true);
	};

	const onUpdateClicked = () => {
		userApiCommunicator.updateAdmins(users);
	};

	const onBackClicked = () => {
		navigate('/user');
	};

	return (
		<div className='admin-container'>
			<div className='admin-header'>
				<span className='admin-title'>Administrative Management</span>
			</div>
			<div className='admin-body'>
				<div className='admin-users-management'>
					<div className='admin-users-list'>
						{users?.map((user, index) => (
							<UserCard key={index} user={user} />
						))}
					</div>
					<div className='admin-users-submition'>
						<button className='admin-button' onClick={onUpdateClicked}>
							Update
						</button>
					</div>
				</div>
				<div className='admin-sites-management'>
					<div className='admin-sites'>
						{sites?.map((site, index) => (
							<SiteCard
								key={index}
								site={site}
								onClick={setSelectedCard}
								highlighted={selectedSite && selectedSite._id === site._id}
								districts={districts}
								seasons={seasons}
								difficulties={difficulties}
								distances={distances}
								durations={durations}
								types={types}
							/>
						))}
					</div>
					<div className='admin-sites-submition'>
						{selectedSite && (
							<button className='admin-button' onClick={onDeleteClicked}>
								Delete
							</button>
						)}
					</div>
				</div>
			</div>
			<div className='admin-navigation'>
				<button className='admin-button' onClick={onBackClicked}>
					Go Back
				</button>
			</div>
		</div>
	);
}
