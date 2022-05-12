import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { keyApiCommunicator } from '../../../api/keyApiCommunicator';
import { siteApiCommunicator } from '../../../api/siteApiCommunicator';
import { tokenFunctions as tokens } from '../../../localTokens/tokenFunctions';
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
	const [sites, setSites] = useState();

	const [districts, setDistrics] = useState();
	const [seasons, setSeasons] = useState();
	const [difficulties, setDifficulties] = useState();
	const [distances, setDistances] = useState();
	const [durations, setDurations] = useState();
	const [types, setTypes] = useState();

	const [selectedSite, setSelectedSite] = useState(-1);

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
	}, []);

	useEffect(() => {
		console.log(season, district, difficulty, distance, duration, type);
		siteApiCommunicator
			.find(undefined, season, district, difficulty, distance, duration, type)
			.then(response => {
				setSites(response.sites);
			});
		setSelectedSite(-1);
	}, [season, district, difficulty, distance, duration, type]);

	useEffect(() => {
		setSelectedCard(-1);
	}, [sites]);

	const setSelectedCard = site => {
		if (selectedSite === site._id) setSelectedSite(-1);
		else setSelectedSite(site._id);
	};

	const onCancelClicked = () => {
		navigate('/user');
	};

	const onNavigateClicked = () => {};

	const onRateClicked = () => {
		if (tokens.getToken('siteid')) tokens.removeToken('siteid');
		const siteDetails = {
			siteid: selectedSite,
		};
		tokens.setToken('siteid', siteDetails);
		navigate('/rate');
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
					{sites?.map((site, index) => (
						<SiteCard
							key={index}
							site={site}
							onClick={setSelectedCard}
							highlighted={selectedSite === site._id}
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
					hidden={selectedSite === -1}
				>
					Navigate
				</button>
				<button
					className='browse-site-submition-button'
					onClick={onRateClicked}
					hidden={selectedSite === -1}
				>
					Rate
				</button>
			</div>
		</div>
	);
}
