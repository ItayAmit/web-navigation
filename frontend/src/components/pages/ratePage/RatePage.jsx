import { useState, useEffect } from 'react';
import _ from 'lodash';
import { tokenFunctions as tokens } from '../../../localTokens/tokenFunctions';
import { siteApiCommunicator } from '../../../api/siteApiCommunicator';
import EmptyStar from '../../../images/EmptyStar.png';
import FilledStar from '../../../images/FilledStar.png';
import './ratePage.css';

export function RatePage() {
	const [siteid, setSiteid] = useState();
	const [site, setSite] = useState();
	const [userid, setUserid] = useState();
	const [rate, setRate] = useState();
	const [stars, setStars] = useState(1);
	useEffect(() => {
		setSiteid(tokens.getToken('siteid').siteid);
		siteApiCommunicator.find(siteid).then(response => {
			setSite(response.site);
		});
	}, [siteid]);
	return (
		<div className='rate-page-container'>
			<span className='rate-page-title'>Rating: {site ? site.name : ''}</span>
			<div className='rate-page-stars'>
				{_.times(5, i => (
					<img
						className='rate-page-star'
						key={i + 1}
						src={stars >= i + 1 ? FilledStar : EmptyStar}
						onClick={() => {
							setStars(i + 1);
						}}
					/>
				))}
			</div>
		</div>
	);
}
