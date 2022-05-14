import { apiCommunicator } from './apiCommunicator';

export const siteApiCommunicator = {
	add,
	find,
};

function add(
	id,
	name,
	season,
	district,
	difficulty,
	distance,
	duration,
	type,
	description
) {
	const site = {
		userid: id,
		name,
		season,
		district,
		difficulty,
		distance,
		duration,
		type,
		description,
	};
	return apiCommunicator.post('addsite', site).then(response => {
		return response;
	});
}

function find(siteid) {
	const params = {
		siteid,
	};
	return apiCommunicator.getWithParams('sites', params);
}
