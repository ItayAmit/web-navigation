import { apiCommunicator } from './apiCommunicator';

export const keyApiCommunicator = {
	getValuesFromKey,
};

function getValuesFromKey(key) {
	return apiCommunicator.get(key);
}
