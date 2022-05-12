import { apiCommunicator } from './apiCommunicator';

export const rateApiCommunicaotr = {
	submit,
	update,
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
