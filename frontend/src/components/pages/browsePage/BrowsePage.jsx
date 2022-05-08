import { useState, useEffect } from 'react';
import { keyApiCommunicator } from '../../../api/keyApiCommunicator';
import { DropDown } from '../../dropDown';
import './browsePage.css';

export function BrowsePage() {
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

	return (
		<div className='browse-site-container'>
			<div className='browse-site-body'>
				<div className='browse-site-filters'>
					<span className='browse-site-span'>Apply filters</span>
					<DropDown title={'Season'} items={seasons} onChange={setSeason} />
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
				<div className='browse-site-list'></div>
			</div>
			<div className='browse-site-submition'></div>
		</div>
	);
}
