import './siteCard.css';

export function SiteCard({
	site,
	onClick,
	highlighted,
	districts,
	seasons,
	difficulties,
	distances,
	durations,
	types,
	showRating = false,
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
			{showRating && (
				<div className='site-card-row'>
					<span className='site-card-characteristic'>
						Average rating: {site.rating && site.rating}
					</span>
					<span className='site-card-characteristic'>
						Number of ratings: {site.numberOfRatings && site.numberOfRatings}
					</span>
				</div>
			)}
			<div className='site-card-row'>
				<span className='site-card-characteristic'>
					District: {districts && districts[site.district].name}
				</span>
				<span className='site-card-characteristic'>
					Season: {seasons && seasons[site.season].name}
				</span>
				<span className='site-card-characteristic'>
					Difficulty: {difficulties && difficulties[site.difficulty].name}
				</span>
			</div>
			<div className='site-card-row'>
				<span className='site-card-characteristic'>
					Distance: {distances && distances[site.distance].name}
				</span>
				<span className='site-card-characteristic'>
					Duration: {durations && durations[site.duration].name}
				</span>
				<span className='site-card-characteristic'>
					Type: {types && types[site.type].name}
				</span>
			</div>
			<div className='site-card-row'>
				<span className='site-card-characteristic'>
					Description: {site.description}
				</span>
			</div>
			{site.url && (
				<div className='site-card-row'>
					<span className='site-card-characteristic'>
						<a className='site-card-url' href={site.url}>
							{site.url}
						</a>
					</span>
				</div>
			)}
		</div>
	);
}
