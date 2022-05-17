import { useState, useEffect } from 'react';
import './userCard.css';

export function UserCard({ user }) {
	const [isAdmin, setIsAdmin] = useState(false);
	useEffect(() => {
		setIsAdmin(user.admin);
	}, [user]);
	const onChange = () => {
		user.admin = !user.admin;
		setIsAdmin(!isAdmin);
	};
	return (
		<div className='user-card-container'>
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
