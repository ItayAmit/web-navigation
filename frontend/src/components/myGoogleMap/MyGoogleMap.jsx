import { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import './myGoogleMap.css';

export function MyGoogleMap({ onClick }) {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: 'AIzaSyBUug7evSHp4bEx16JGYk8fMVH35WJ9Acc',
	});
	const [center, setCenter] = useState({ lat: 32.08987, lng: 34.880451 });
	const [clickedLatLng, setClickedLatLng] = useState();
	useEffect(() => {
		onClick(clickedLatLng);
	}, [clickedLatLng]);

	if (!isLoaded) return <div>Loading...</div>;
	return (
		<div className='google-map-container'>
			<GoogleMap
				zoom={16}
				center={center}
				mapContainerClassName='map-container'
				onClick={e => {
					setClickedLatLng(e.latLng.toJSON());
				}}
			>
				{clickedLatLng ? <Marker position={clickedLatLng} /> : <></>}
			</GoogleMap>
		</div>
	);
}
