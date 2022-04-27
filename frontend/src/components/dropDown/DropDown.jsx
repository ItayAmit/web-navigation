import { useState } from 'react';
import arrow from '../../images/arrow.png';
import betterarrow from '../../images/betterarrow.png';
import './dropDown.css';

export function DropDown({ title = 'DropDown', items, onChange }) {
	const [hidden, setHidden] = useState(true);
	const [dynamicTitle, setDynamicTitle] = useState(title);
	const onItemClicked = (value, string) => {
		onChange(value);
		setDynamicTitle(string);
	};
	return (
		<div className='drop-down-container'>
			<div
				className='drop-down-header'
				onClick={() => {
					setHidden(!hidden);
				}}
			>
				<span className='drop-down-header-title'>{dynamicTitle}</span>
				<img
					className='drop-down-header-image'
					src={arrow}
					style={
						hidden
							? { transform: 'rotate(0deg)' }
							: { transform: 'rotate(180deg)' }
					}
				/>
			</div>
			<ul className='drop-down-list' hidden={hidden}>
				{items.map((item, index) => (
					<li
						className='drop-down-list-item'
						key={index}
						onClick={() => {
							onItemClicked(item.value, item.string);
							setHidden(true);
						}}
					>
						{item.string}
					</li>
				))}
			</ul>
		</div>
	);
}
