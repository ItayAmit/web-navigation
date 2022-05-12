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
				<span className='site-card-characteristic'>
					District: {districts[site.district].name}
				</span>
				<span className='site-card-characteristic'>
					Season: {seasons[site.season].name}
				</span>
				<span className='site-card-characteristic'>
					Difficulty: {difficulties[site.difficulty].name}
				</span>
			</div>
			<div className='site-card-row'>
				<span className='site-card-characteristic'>
					Distance: {distances[site.distance].name}
				</span>
				<span className='site-card-characteristic'>
					Duration: {durations[site.duration].name}
				</span>
				<span className='site-card-characteristic'>
					Type: {types[site.type].name}
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
