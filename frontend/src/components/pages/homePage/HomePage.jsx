import { useNavigate } from 'react-router-dom';
import familyHiking from '../../../images/familyhiking.jpg';
import coupleHiking from '../../../images/couplehiking.jpg';
import generalHiking from '../../../images/generalhiking.jpg';
import './homePage.css';

export function HomePage() {
	const navigate = useNavigate();

	const onLoginClicked = () => {
		navigate('/login');
	};

	const onRegisterClicked = () => {
		navigate('/register');
	};

	return (
		<div className='home-page-container'>
			<span className='home-page-title'>Let's Go!</span>
			<span className='home-page-description'>
				This is a site where travelers can come together, <br />
				learn about sites that others have recommended, <br />
				add new sites, and even navigate freely!
			</span>
			<div className='home-page-navigation'>
				<button
					className='home-page-navigation-button'
					onClick={onLoginClicked}
				>
					Login
				</button>
				<button
					className='home-page-navigation-button'
					onClick={onRegisterClicked}
				>
					Register
				</button>
			</div>
			<div className='home-page-images'>
				<img className='home-page-image' src={familyHiking} />
				<img className='home-page-image' src={coupleHiking} />
				<img className='home-page-image' src={generalHiking} />
			</div>
		</div>
	);
}
