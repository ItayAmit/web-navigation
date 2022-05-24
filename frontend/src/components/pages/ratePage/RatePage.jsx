import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { tokenFunctions as tokens } from '../../../localTokens/tokenFunctions';
import { siteApiCommunicator } from '../../../api/siteApiCommunicator';
import { rateApiCommunicator } from '../../../api/rateApiCommunicator';
import EmptyStar from '../../../images/EmptyStar.png';
import FilledStar from '../../../images/FilledStar.png';
import './ratePage.css';

export function RatePage() {
	const navigate = useNavigate();

	const [siteid, setSiteid] = useState();
	const [site, setSite] = useState();
	const [userid, setUserid] = useState();
	const [rate, setRate] = useState();
	const [rating, setRating] = useState(1);
	const [hoverRating, setHoverRating] = useState(1);
	const [hover, setHover] = useState(false);
	const [comment, setComment] = useState('');
	const [isNew, setIsNew] = useState(true);
	const ratingDescriptions = [
		'Terrible',
		'Bad',
		'Okay',
		'Enjoyed it',
		'Terrific!',
	];
	useEffect(() => {
		setSiteid(tokens.getToken('siteid').siteid);
		siteApiCommunicator.find(siteid).then(response => {
			setSite(response.site);
		});
		setUserid(tokens.getToken('userDetails').userId);
		rateApiCommunicator.retrieve(userid, siteid).then(response => {
			setRate(response.rate);
		});
	}, [siteid]);
	useEffect(() => {
		if (rate) {
			setIsNew(false);
			setComment(rate.comment);
			setRating(rate.rating);
		}
	}, [rate]);

	const onSubmitClicked = () => {
		const day = String(new Date().getDate()).padStart(2, '0');
		const month = String(new Date().getMonth() + 1).padStart(2, '0'); //January is 0!
		const year = new Date().getFullYear();
		const today = `${day}/${month}/${year}`;
		if (isNew)
			rateApiCommunicator.submit(userid, siteid, rating, comment, today);
		else rateApiCommunicator.update(userid, siteid, rating, comment, today);
		navigate('/browse');
	};
	const onCommentChanged = event => {
		setComment(event.target.value);
	};
	const onCancelClicked = () => {
		navigate('/browse');
	};
	return (
		<div className='rate-page-container'>
			<span className='rate-page-title'>Rating: {site ? site.name : ''}</span>
			<div className='rate-page-stars'>
				{_.times(5, i => (
					<img
						className='rate-page-rating'
						key={i + 1}
						src={
							hover
								? hoverRating >= i + 1
									? FilledStar
									: EmptyStar
								: rating >= i + 1
								? FilledStar
								: EmptyStar
						}
						onClick={() => {
							setRating(i + 1);
						}}
						onMouseEnter={() => {
							setHoverRating(i + 1);
							setHover(true);
						}}
						onMouseLeave={() => {
							setHover(false);
						}}
					/>
				))}
			</div>
			<span className='rate-page-rating-description'>
				{hover
					? ratingDescriptions[hoverRating - 1]
					: ratingDescriptions[rating - 1]}
			</span>
			<textarea
				className='rate-page-comment'
				rows='7'
				maxLength={250}
				value={comment}
				onChange={onCommentChanged}
			/>
			<div className='rate-page-submition'>
				<button className='rate-page-button' onClick={onSubmitClicked}>
					{isNew ? 'Submit' : 'Update'}
				</button>
				<button className='rate-page-button' onClick={onCancelClicked}>
					Cancel
				</button>
			</div>
		</div>
	);
}
