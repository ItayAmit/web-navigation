import { apiCommunicator } from './apiCommunicator';

export const siteApiCommunicator = {
	add,
	find,
	remove,
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
	description,
	location,
	url
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
		location,
		url,
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

function remove(siteid) {
	return apiCommunicator.del('sites', siteid);
}
