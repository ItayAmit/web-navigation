import { apiCommunicator } from './apiCommunicator';

export const siteApiCommunicator = {
	add,
	find,
};

function add(name, season, district, difficulty, distance, duration) {
	const site = {
		name,
		season,
		district,
		difficulty,
		distance,
		duration,
	};
	console.log(site);
	return apiCommunicator.post('addsite', site).then(response => {
		return response;
	});
}

function find(site) {}
