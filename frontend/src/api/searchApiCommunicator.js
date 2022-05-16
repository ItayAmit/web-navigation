import { apiCommunicator } from './apiCommunicator';

export const searchApiCommunicator = {
	save,
	getAll,
};

function save(
	userid,
	season,
	district,
	difficulty,
	distance,
	duration,
	type,
	date
) {
	const search = {
		userid,
		season,
		district,
		difficulty,
		distance,
		duration,
		type,
		date,
	};
	return apiCommunicator.post('search', search).then(response => {
		return response;
	});
}

function getAll() {
	return apiCommunicator.get('search').then(response => {
		return response;
	});
}
