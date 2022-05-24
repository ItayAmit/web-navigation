import { useState, useEffect } from 'react';
import './userCard.css';

export function UserCard({ user, highlighted, onClick }) {
	const [isAdmin, setIsAdmin] = useState(false);
	useEffect(() => {
		setIsAdmin(user.admin);
	}, [user]);
	const onChange = () => {
		user.admin = !user.admin;
		setIsAdmin(!isAdmin);
	};
	const onCardClicked = () => {
		onClick(user);
	};
	return (
		<div
			className='user-card-container'
			style={
				highlighted ? { borderColor: '#add8e6' } : { borderColor: '#666666' }
			}
			onClick={onCardClicked}
		>
			<span className='user-name'>{user.firstname}</span>
			<input
				type='checkbox'
				className='user-is-admin'
				checked={isAdmin}
				onChange={onChange}
			/>
		</div>
	);
}
