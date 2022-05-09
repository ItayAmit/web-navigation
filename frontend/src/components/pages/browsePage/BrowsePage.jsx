import { useState, useEffect } from 'react';
import { keyApiCommunicator } from '../../../api/keyApiCommunicator';
import { siteApiCommunicator } from '../../../api/siteApiCommunicator';
import { DropDown } from '../../dropDown';
import { SiteCard } from '../../siteCard';
import './browsePage.css';

export function BrowsePage() {
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

	const [selectedSite, setSelectedSite] = useState();
	const [highlight, setHighlight] = useState(-1);

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
		siteApiCommunicator
			.find(season, district, difficulty, distance, duration, type)
			.then(response => {
				setSites(response.sites);
			});
	}, [season, district, difficulty, distance, duration, type]);

	const setSelectedCard = (siteid, number) => {
		setSelectedSite(siteid);
		setHighlight(number);
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
							number={index}
							site={site}
							onClick={setSelectedCard}
							highlighted={highlight === index}
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
			<div className='browse-site-submition'></div>
		</div>
	);
}
