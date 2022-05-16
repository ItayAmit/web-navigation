import React from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import './mapbox.css';
import icon from '../../images/marker.png';

export function Mapbox({ onClick, marker }) {
	const API_KEY =
		'pk.eyJ1IjoiaXRheWFtaXQiLCJhIjoiY2wzOGZlN3ozMDBpcjNtbnd0dzI2bDJ2ayJ9.DQHoDuY5K4J0PH3_n0Av5A';
	const dark = 'mapbox://styles/mapbox/dark-v10';
	const light = 'mapbox://styles/mapbox/light-v10';
	const initialViewState = {
		latitude: 32.08987,
		longitude: 34.880451,
		zoom: 13,
	};
	const style = {
		width: '60vw',
		height: '60vh',
		marginLeft: 'auto',
		marginRight: 'auto',
		borderRadius: '5px',
	};
	const addMarker = e => {
		onClick(e.lngLat);
	};
	return (
		<div className='container'>
			<Map
				initialViewState={initialViewState}
				style={style}
				mapboxAccessToken={API_KEY}
				mapStyle={dark}
				onClick={addMarker}
			>
				{marker && (
					<Marker longitude={marker.lng} latitude={marker.lat}>
						<img src={icon} height='50px' />
					</Marker>
				)}
				{/* {markers?.map((marker, index) => (
					<Marker key={index} longitude={marker.lng} latitude={marker.lat}>
						<img src={icon} height='50px' />
					</Marker>
				))} */}
			</Map>
		</div>
	);
}
