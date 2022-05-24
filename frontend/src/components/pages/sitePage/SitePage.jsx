import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { keyApiCommunicator } from '../../../api/keyApiCommunicator';
import { siteApiCommunicator } from '../../../api/siteApiCommunicator';
import { tokenFunctions as tokens } from '../../../localTokens/tokenFunctions';
import { rateApiCommunicator } from '../../../api/rateApiCommunicator';
import './sitePage.css';

export function SitePage({}) {
	const navigate = useNavigate();

	const [site, setSite] = useState();
	const [districts, setDistrics] = useState();
	const [seasons, setSeasons] = useState();
	const [difficulties, setDifficulties] = useState();
	const [distances, setDistances] = useState();
	const [durations, setDurations] = useState();
	const [types, setTypes] = useState();

	const [hiddenRates, setHiddenRates] = useState();
	const [rates, setRates] = useState();
	const [showMessage, setShowMessage] = useState(false);

	const [logged, setLogged] = useState(true);

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
		siteApiCommunicator
			.find(tokens.getToken('siteid').siteid)
			.then(response => {
				setSite(response.site);
			});
		rateApiCommunicator.retrieve().then(response => {
			setHiddenRates(response.rates);
		});
		setLogged(tokens.getToken('islogged'));
	}, []);

	useEffect(() => {
		if (!(site && hiddenRates)) return;
		setRates(hiddenRates.filter(rate => rate.siteid === site._id));
	}, [hiddenRates, site]);

	useEffect(() => {
		if (!rates || rates.length === 0) setShowMessage(true);
	}, [rates]);

	const onCancelClicked = () => {
		if (logged) navigate('/browse');
		else navigate('/home');
	};

	const onRateClicked = () => {
		navigate('/rate');
	};

	return (
		<div className='site-page-container'>
			<div className='site-page-body'>
				{site && (
					<div className='site-page-characteristics'>
						<span className='site-page-title'>{site.name}</span>
						<span className='site-page-characteristic'>
							Lat: {site.location.lat} Lng: {site.location.lng}
						</span>
						<span className='site-page-characteristic'>
							District: {districts && districts[site.district].name}
						</span>
						<span className='site-page-characteristic'>
							Season: {seasons && seasons[site.season].name}
						</span>
						<span className='site-page-characteristic'>
							Difficulty: {difficulties && difficulties[site.difficulty].name}
						</span>
						<span className='site-page-characteristic'>
							Distance: {distances && distances[site.distance].name}
						</span>
						<span className='site-page-characteristic'>
							Duration: {durations && durations[site.duration].name}
						</span>
						<span className='site-page-characteristic'>
							Type: {types && types[site.type].name}
						</span>
						<span className='site-page-characteristic'>
							Description: {site.description}
						</span>
						<span className='site-page-characteristic'>
							<a className='site-page-url' href={site.url}>
								{site.url}
							</a>
						</span>
					</div>
				)}

				<div className='site-page-rates'>
					{showMessage && (
						<div className='site-page-message'>
							<span>There are no rates for this site yet.</span>
						</div>
					)}
					{rates?.map((rate, index) => {
						return (
							<div className='site-page-rate' key={index}>
								<span className='rate-field'>Rating: {rate.rating}</span>
								<span className='rate-field'>Comment: {rate.comment}</span>
								{rate.date && (
									<span className='rate-field'>Date: {rate.date}</span>
								)}
							</div>
						);
					})}
				</div>
			</div>
			<div className='site-page-submition'>
				<button
					className='site-page-submition-button'
					onClick={onCancelClicked}
				>
					Cancel
				</button>
				{logged && (
					<button
						className='site-page-submition-button'
						onClick={onRateClicked}
					>
						Rate
					</button>
				)}
			</div>
		</div>
	);
}
