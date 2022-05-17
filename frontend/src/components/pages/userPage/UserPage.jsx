import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApiCommunicator } from '../../../api/userApiCommunicator';
import { tokenFunctions as tokens } from '../../../localTokens/tokenFunctions';
import { keyApiCommunicator } from '../../../api/keyApiCommunicator';
import { searchApiCommunicator } from '../../../api/searchApiCommunicator';
import { siteApiCommunicator } from '../../../api/siteApiCommunicator';
import { SiteCard } from '../../siteCard';
import logout from '../../../images/logout.png';
import navigation from '../../../images/navigation.png';
import socialNetwork from '../../../images/socialnetwork.jpg';

import './userPage.css';

export function UserPage() {
	const navigate = useNavigate();
	const [user, setUser] = useState({ firstname: 'Guest' });

	const [sites, setSites] = useState();
	const [personalSites, setPersonalSites] = useState([]);
	const [searches, setSearches] = useState();
	const [personalSearches, setPersonalSearches] = useState();
	const [selectedSite, setSelectedSite] = useState();
	const [hasSearched, setHasSearched] = useState(false);

	const [districts, setDistrics] = useState();
	const [seasons, setSeasons] = useState();
	const [difficulties, setDifficulties] = useState();
	const [distances, setDistances] = useState();
	const [durations, setDurations] = useState();
	const [types, setTypes] = useState();

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
		siteApiCommunicator.find().then(response => {
			setSites(response.sites);
		});
		searchApiCommunicator.getAll().then(response => {
			setSearches(response.searches);
		});
		const token = tokens.getToken('userDetails');
		if (!token) {
			alert('User has timed out. Please log in again');
			navigate('/login');
		}
		const userId = token.userId;
		userApiCommunicator.load(userId).then(response => {
			if (response['user']) {
				setUser(response.user);
			}
		});
	}, []);

	useEffect(() => {
		if (!(searches && sites && user._id)) return;
		setPersonalSearches(searches.filter(search => search.userid === user._id));
	}, [searches, sites, user]);
	useEffect(() => {
		if (!personalSearches || personalSearches.length === 0) return;
		const singleSearch = personalSearches.reduce((max, search) =>
			max.date > search.date ? max : search
		);
		sites?.forEach(site => {
			if (
				singleSearch.season === site.season &&
				singleSearch.district === site.district &&
				singleSearch.difficulty === site.difficulty &&
				singleSearch.distance === site.distance &&
				singleSearch.duration === site.duration &&
				singleSearch.type === site.type
			)
				setPersonalSites([...personalSites, site]);
		});
	}, [personalSearches]);

	useEffect(() => {
		if (personalSites && personalSites.length !== 0) setHasSearched(true);
	}, [personalSites]);
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
	const onAdminClicked = () => {
		navigate('/admin');
	};
	return (
		<div className='user-page-container'>
			<div className='user-page-header'>
				<span className='user-page-title'>Welcome back {user.firstname}</span>
				<img
					className='user-page-logout'
					src={logout}
					onClick={onLogoutClicked}
				/>
			</div>
			<div className='user-page-navigation'>
				<button
					className='user-page-navigation-button'
					onClick={onNavigateClicked}
				>
					Navigate
				</button>
				<button
					className='user-page-navigation-button'
					onClick={onBrowseClicked}
				>
					Browse
				</button>
				<button
					className='user-page-navigation-button'
					onClick={onAddSiteClicked}
				>
					Add Site
				</button>
				{user && user.admin && (
					<button
						className='user-page-navigation-button'
						onClick={onAdminClicked}
					>
						Admin
					</button>
				)}
			</div>
			<div className='user-page-body'>
				<div className='user-page-recommendations'>
					<div className='user-page-recommendations-title'>
						Our recommendations based on your latest search:
					</div>
					{hasSearched ? (
						<div className='user-page-recommendations-list'>
							{personalSites?.map((site, index) => (
								<SiteCard
									key={index}
									site={site}
									onClick={setSelectedSite}
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
					) : (
						<span className='user-page-recommendations-error'>
							You haven't searched for sites yet.
						</span>
					)}
				</div>
				<div className='user-page-images'>
					<img className='user-page-image' src={navigation} />
					<img className='user-page-image' src={socialNetwork} />
				</div>
			</div>
		</div>
	);
}
