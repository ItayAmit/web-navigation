import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiteCard } from '../../siteCard';
import { keyApiCommunicator } from '../../../api/keyApiCommunicator';
import { searchApiCommunicator } from '../../../api/searchApiCommunicator';
import { siteApiCommunicator } from '../../../api/siteApiCommunicator';
import familyHiking from '../../../images/familyhiking.jpg';
import coupleHiking from '../../../images/couplehiking.jpg';
import generalHiking from '../../../images/generalhiking.jpg';
import './homePage.css';

export function HomePage() {
	const navigate = useNavigate();
	const [sites, setSites] = useState();
	const [weeklySites, setWeeklySites] = useState([]);
	const [searches, setSearches] = useState();
	const [weeklySearches, setWeeklySearches] = useState();
	const [selectedSite, setSelectedSite] = useState();

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
	}, []);

	useEffect(() => {
		if (!searches || !sites) return;
		const now = Date.now();
		const week = 7 * 24 * 60 * 60 * 1000;
		setWeeklySearches(searches.filter(search => now - search.date <= week));
	}, [searches, sites]);

	useEffect(() => {
		if (!weeklySearches) return;
		sites.forEach(site => {
			let flag = false;
			weeklySearches.forEach(search => {
				if (
					search.season === site.season &&
					search.district === site.district &&
					search.difficulty === site.difficulty &&
					search.distance === site.distance &&
					search.duration === site.duration &&
					search.type === site.type
				)
					flag = true;
			});
			site.weekly = flag;
		});
		setWeeklySites(sites.filter(site => site.weekly));
	}, [weeklySearches]);

	useEffect(() => {
		console.log(weeklySites.length);
	}, [weeklySites]);

	const onLoginClicked = () => {
		navigate('/login');
	};

	const onRegisterClicked = () => {
		navigate('/register');
	};

	return (
		<div className='home-page-container'>
			<span className='home-page-title'>Let's Go!</span>
			<span className='home-page-description'>
				This is a site where travelers can come together, <br />
				learn about sites that others have recommended, <br />
				add new sites, and even navigate freely!
			</span>
			<div className='home-page-navigation'>
				<button
					className='home-page-navigation-button'
					onClick={onLoginClicked}
				>
					Login
				</button>
				<button
					className='home-page-navigation-button'
					onClick={onRegisterClicked}
				>
					Register
				</button>
			</div>
			<div className='home-page-body'>
				<div className='home-page-images'>
					<img className='home-page-image' src={coupleHiking} />
					<img className='home-page-image' src={generalHiking} />
					<img className='home-page-image' src={familyHiking} />
				</div>
				<div className='home-page-recommendations'>
					<span className='home-page-recommendations-title'>
						This week's recommendations:
					</span>
					<div className='home-page-recommendations-list'>
						{weeklySites?.map((site, index) => (
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
				</div>
			</div>
		</div>
	);
}
