import './siteCard.css';

export function SiteCard({
	site,
	onClick,
	highlighted,
	rating = 0,
	numberOfRatings = 0,
	districts,
	seasons,
	difficulties,
	distances,
	durations,
	types,
}) {
	const onCardClicked = () => {
		onClick(site);
	};
	return (
		<div
			className='site-card-container'
			onClick={onCardClicked}
			style={
				highlighted ? { borderColor: '#add8e6' } : { borderColor: '#666666' }
			}
		>
			<span className='site-card-title'>{site.name}</span>
			<div className='site-card-row'>
				{site.location && (
					<span className='site-card-characteristic'>
						Lat: {site.location.lat} Lng: {site.location.lng}
					</span>
				)}
			</div>
			{rating !== 0 && numberOfRatings !== 0 && (
				<div className='site-card-row'>
					<span className='site-card-characteristic'>
						Average rating: {rating}
					</span>
					<span className='site-card-characteristic'>
						Number of ratings: {numberOfRatings}
					</span>
				</div>
			)}
			<div className='site-card-row'>
				<span className='site-card-characteristic'>
					District: {districts ? districts[site.district].name : 0}
				</span>
				<span className='site-card-characteristic'>
					Season: {seasons ? seasons[site.season].name : 0}
				</span>
				<span className='site-card-characteristic'>
					Difficulty: {difficulties ? difficulties[site.difficulty].name : 0}
				</span>
			</div>
			<div className='site-card-row'>
				<span className='site-card-characteristic'>
					Distance: {distances ? distances[site.distance].name : 0}
				</span>
				<span className='site-card-characteristic'>
					Duration: {durations ? durations[site.duration].name : 0}
				</span>
				<span className='site-card-characteristic'>
					Type: {types ? types[site.type].name : 0}
				</span>
			</div>
			<div className='site-card-row'>
				<span className='site-card-characteristic'>
					Description: {site.description}
				</span>
			</div>
		</div>
	);
}
