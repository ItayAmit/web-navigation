import { useState } from 'react';
import { DropDown } from '../../dropDown';
import { PageInput } from '../../pageInput';
import './siteAdd.css';

export function SiteAddPage() {
	const [siteName, setSiteName] = useState('');
	const [siteNameError, setSiteNameError] = useState('');
	const [season, setSeason] = useState(-1);
	const [district, setDistrict] = useState(-1);
	const [difficulty, setDifficulty] = useState(-1);
	const [distance, setDistance] = useState(-1);
	const [duration, setDuration] = useState(-1);
	const seasons = [
		{ string: 'Summer', value: 0 },
		{ string: 'Autumn', value: 1 },
		{ string: 'Winter', value: 2 },
		{ string: 'Spring', value: 3 },
	];
	const districts = [
		{ string: 'Central', value: 0 },
		{ string: 'Northern', value: 1 },
		{ string: 'Southern', value: 2 },
		{ string: 'Western', value: 3 },
		{ string: 'Eastern', value: 4 },
	];
	const difficulties = [
		{ string: 'Easy', value: 0 },
		{ string: 'Moderate', value: 1 },
		{ string: 'Challenging', value: 2 },
	];
	const distances = [
		{ string: 'Less than 5 KM', value: 0 },
		{ string: 'Between 5 and 10 KM', value: 1 },
		{ string: 'More than 10 KM', value: 2 },
	];
	const durations = [
		{ string: 'Less than 1 hour', value: 0 },
		{ string: 'Between 1 and 2 hours', value: 1 },
		{ string: 'Between 3 and 4 hours', value: 2 },
		{ string: 'More than 4 hours', value: 3 },
	];
	const onCancelClicked = () => {};
	const onSubmitClicked = () => {
		const flag = true;
		if ([season, district, difficulty, distance, duration].includes(-1)) {
			// non-chosen field
			flag = false;
		}
		if (siteName === '') {
			// name left empty
			flag = false;
		}
		if (flag) {
			const site = {
				name: siteName,
				season,
				difficulty,
				district,
				distance,
				duration,
			};
		}
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
					<span className='site-add-span'>
						Add a brief description of the site
					</span>
				</div>
				<div className='site-add-map'>
					<span className='site-add-span'>Choose a location on the map</span>
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
