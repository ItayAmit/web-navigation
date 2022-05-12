import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { siteApiCommunicator } from '../../../api/siteApiCommunicator';
import { keyApiCommunicator } from '../../../api/keyApiCommunicator';
import { tokenFunctions as tokens } from '../../../localTokens/tokenFunctions';

import { DropDown } from '../../dropDown';
import { PageInput } from '../../pageInput';
import { MyGoogleMap } from '../../myGoogleMap';

import './siteAddPage.css';

export function SiteAddPage() {
	const navigate = useNavigate();
	const [userId, setUserId] = useState('');

	const [siteName, setSiteName] = useState('');
	const [siteNameError, setSiteNameError] = useState('');
	const [season, setSeason] = useState(-1);
	const [district, setDistrict] = useState(-1);
	const [difficulty, setDifficulty] = useState(-1);
	const [distance, setDistance] = useState(-1);
	const [duration, setDuration] = useState(-1);
	const [type, setType] = useState(-1);
	const [description, setDescription] = useState('');

	const [districts, setDistrics] = useState();
	const [seasons, setSeasons] = useState();
	const [difficulties, setDifficulties] = useState();
	const [distances, setDistances] = useState();
	const [durations, setDurations] = useState();
	const [types, setTypes] = useState();

	const [marker, setMarker] = useState();

	useEffect(() => {
		const token = tokens.getToken('userDetails');
		setUserId(token.userId);
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
		if (marker) determineDistrict();
	}, [marker]);

	useEffect(() => {
		console.log(district);
	}, [district]);

	const onDescriptionChanged = event => {
		setDescription(event.target.value);
	};
	const onCancelClicked = () => {
		navigate(`/user`);
	};
	const onSubmitClicked = () => {
		let flag = true;
		if ([district, season, difficulty, distance, duration, type].includes(-1)) {
			alert('Please finish configuring the site');
			flag = false;
		}
		if (siteName === '') {
			setSiteNameError('Cannot be left empty');
			flag = false;
		} else if (description === '') {
			alert('Site description cannot be left empty');
			flag = false;
		} else {
			setSiteNameError('');
		}
		if (flag) {
			siteApiCommunicator
				.add(
					userId,
					siteName,
					season,
					district,
					difficulty,
					distance,
					duration,
					type,
					description
				)
				.then(response => {
					if (response.msg['name']) setSiteNameError(response.msg.name);
					else navigate(`/user`);
				});
		}
	};

	const isInDistrict = (point, district) => {
		const { lat, lng } = point;
		const { north, east, south, west } = district;
		if (lat < south || lat > north) return false;
		if (lng > east || lng < west) return false;
		return true;
	};
	const determineDistrict = () => {
		districts.forEach(district => {
			if (isInDistrict(marker, district)) setDistrict(district.key);
		});
	};

	return (
		<div className='site-add-container'>
			<div className='site-add-configuration'>
				<div className='site-add-characteristics'>
					<span className='site-add-span'>Configure the site</span>
					<PageInput
						title="The site's name"
						placeholder='Enter name'
						value={siteName}
						onChange={setSiteName}
						error={siteNameError}
					/>
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
					<span className='site-add-span'>
						Add a brief description of the site
					</span>
					<textarea
						className='site-add-description'
						rows='7'
						maxLength={250}
						value={description}
						onChange={onDescriptionChanged}
					/>
				</div>
				<div className='site-add-map'>
					<span className='site-add-span'>Choose a location on the map</span>
					<MyGoogleMap onClick={setMarker} markers={marker} />
				</div>
			</div>
			<div className='site-add-submition'>
				<button className='site-add-submition-button' onClick={onCancelClicked}>
					Cancel
				</button>
				<button className='site-add-submition-button' onClick={onSubmitClicked}>
					Submit
				</button>
			</div>
		</div>
	);
}
