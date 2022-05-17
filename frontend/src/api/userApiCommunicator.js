import { apiCommunicator } from './apiCommunicator';

export const userApiCommunicator = {
	login,
	register,
	load,
	loadAll,
	updateAdmins,
};

function login(username, password) {
	const user = {
		username,
		password,
	};
	return apiCommunicator.post('login', user).then(response => {
		return response;
	});
}

function register(username, password, firstname, lastname, email) {
	const user = {
		username,
		password,
		firstname,
		lastname,
		email,
	};
	return apiCommunicator.post('register', user);
}

function load(id) {
	return apiCommunicator.get(`user/${id}`);
}

function loadAll() {
	return apiCommunicator.get('user');
}

function updateAdmins(users) {
	return apiCommunicator.put('user', users).then(response => {
		return response;
	});
}
