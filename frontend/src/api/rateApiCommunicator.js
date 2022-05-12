import { apiCommunicator } from './apiCommunicator';

export const rateApiCommunicator = {
	submit,
	update,
	retrieve,
};

function submit(userid, siteid, rating, comment) {
	const rate = {
		userid,
		siteid,
		rating,
		comment,
	};
	return apiCommunicator.post('rate', rate).then(response => {
		return response;
	});
}

function update(userid, siteid, rating, comment) {
	const rate = {
		userid,
		siteid,
		rating,
		comment,
	};
	return apiCommunicator.put('rate', rate).then(response => {
		return response;
	});
}

function retrieve(userid, siteid) {
	const params = {
		userid,
		siteid,
	};
	return apiCommunicator.getWithParams('rate', params).then(response => {
		return response;
	});
}
