import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { keyApiCommunicator } from '../../../api/keyApiCommunicator';
import { siteApiCommunicator } from '../../../api/siteApiCommunicator';
import { rateApiCommunicator } from '../../../api/rateApiCommunicator';
import { tokenFunctions as tokens } from '../../../localTokens/tokenFunctions';
import { searchApiCommunicator } from '../../../api/searchApiCommunicator';
import { DropDown } from '../../dropDown';
import { SiteCard } from '../../siteCard';
import './browsePage.css';

export function BrowsePage() {
	const navigate = useNavigate();
	const [district, setDistrict] = useState(-1);
	const [season, setSeason] = useState(-1);
	const [difficulty, setDifficulty] = useState(-1);
	const [distance, setDistance] = useState(-1);
	const [duration, setDuration] = useState(-1);
	const [type, setType] = useState(-1);

	const [districts, setDistrics] = useState();
	const [seasons, setSeasons] = useState();
	const [difficulties, setDifficulties] = useState();
	const [distances, setDistances] = useState();
	const [durations, setDurations] = useState();
	const [types, setTypes] = useState();

	const [hiddenSites, setHiddenSites] = useState();
	const [shownSites, setShownSites] = useState();

	const [selectedSite, setSelectedSite] = useState();
	const [rates, setRates] = useState();

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
			setHiddenSites(response.sites);
		});
		rateApiCommunicator.retrieve().then(response => {
			setRates(response.rates);
		});
	}, []);

	useEffect(() => {
		if (hiddenSites && rates) {
			addRatings();
			sortSites();
			filterSites();
		}
	}, [hiddenSites, rates]);

	useEffect(() => {
		filterSites();
		setSelectedSite();
	}, [season, district, difficulty, distance, duration, type]);

	const filterSites = () => {
		setShownSites(
			hiddenSites?.filter(site => {
				return (
					(season !== -1 ? site.season === season : true) &&
					(district !== -1 ? site.district === district : true) &&
					(difficulty !== -1 ? site.difficulty === difficulty : true) &&
					(distance !== -1 ? site.distance === distance : true) &&
					(duration !== -1 ? site.duration === duration : true) &&
					(type !== -1 ? site.type === type : true)
				);
			})
		);
	};

	const addRatings = () => {
		hiddenSites?.forEach(site => {
			const belongingRates = rates.filter(rate => rate.siteid === site._id);
			const ratesCount = belongingRates.length;
			const ratesSum = belongingRates.reduce((accumulator, rate) => {
				return accumulator + rate.rating;
			}, 0);
			site.rating = ratesCount !== 0 ? ratesSum / ratesCount : 0;
			site.numberOfRatings = ratesCount;
		});
	};

	const sortSites = () => {
		hiddenSites.sort((a, b) =>
			a.rating === b.rating
				? b.numberOfRatings - a.numberOfRatings
				: b.rating - a.rating
		);
	};

	const setSelectedCard = site => {
		setSelectedSite(site);
	};

	const onCancelClicked = () => {
		navigate('/user');
	};

	const onNavigateClicked = () => {
		const userid = tokens.getToken('userDetails').userId;
		searchApiCommunicator.save(
			userid,
			selectedSite.season,
			selectedSite.district,
			selectedSite.difficulty,
			selectedSite.distance,
			selectedSite.duration,
			selectedSite.type,
			Date.now()
		);
	};

	const onRateClicked = () => {
		if (tokens.getToken('siteid')) tokens.removeToken('siteid');
		const siteDetails = {
			siteid: selectedSite._id,
		};
		tokens.setToken('siteid', siteDetails);
		navigate('/rate');
	};

	const onSitePageClicked = () => {
		if (tokens.getToken('siteid')) tokens.removeToken('siteid');
		const siteDetails = {
			siteid: selectedSite._id,
		};
		tokens.setToken('siteid', siteDetails);
		navigate('/sitepage');
	};

	return (
		<div className='browse-site-container'>
			<div className='browse-site-body'>
				<div className='browse-site-filters'>
					<span className='browse-site-span'>Apply filters</span>
					<DropDown title={'Season'} items={seasons} onChange={setSeason} />
					<DropDown
						title={'District'}
						items={districts}
						onChange={setDistrict}
					/>
					<DropDown
						title={'Difficulty'}
						items={difficulties}
						onChange={setDifficulty}
					/>
					<DropDown
						title={'Distance'}
						items={distances}
						onChange={setDistance}
					/>
					<DropDown
						title={'Duration'}
						items={durations}
						onChange={setDuration}
					/>
					<DropDown title={'Type'} items={types} onChange={setType} />
				</div>
				<div className='browse-site-list'>
					{shownSites?.map((site, index) => (
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
							showRating={true}
						/>
					))}
				</div>
			</div>
			<div className='browse-site-submition'>
				<button
					className='browse-site-submition-button'
					onClick={onCancelClicked}
				>
					Cancel
				</button>
				<button
					className='browse-site-submition-button'
					onClick={onNavigateClicked}
					hidden={!selectedSite}
				>
					Navigate
				</button>
				<button
					className='browse-site-submition-button'
					onClick={onRateClicked}
					hidden={!selectedSite}
				>
					Rate
				</button>
				<button
					className='browse-site-submition-button'
					onClick={onSitePageClicked}
					hidden={!selectedSite}
				>
					View
				</button>
			</div>
		</div>
	);
}
