import './dropDown.css';

export function DropDown({ title = 'DropDown', items }) {
	return (
		<div className='drop-down-container'>
			<span className='drop-down-title'>{title}</span>
			<ul className='drop-down-list'>
				{items.map((value, index) => {
					<li className='drop-down-list-item' key={index}>
						{value}
					</li>;
				})}
			</ul>
		</div>
	);
}
