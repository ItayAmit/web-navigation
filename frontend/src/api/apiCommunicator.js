import Axios from 'axios';

export const apiCommunicator = {
	get,
	getWithParams,
	post,
	put,
	del,
};

const API_URL = 'http://localhost:5000';

async function get(path) {
	return await Axios.get(`${API_URL}/${path}`)
		.then(response => {
			return response.data;
		})
		.catch(error => {
			return { msg: error.response.data.msg };
		});
}

async function getWithParams(path, params) {
	return await Axios.get(`${API_URL}/${path}`, { params })
		.then(response => {
			return response.data;
		})
		.catch(error => {
			return { msg: error.response.data.msg };
		});
}

async function post(path, body) {
	return await Axios.post(`${API_URL}/${path}`, body)
		.then(response => {
			return response.data;
		})
		.catch(error => {
			return { msg: error.response.data.msg };
		});
}

async function put(path, body) {
	return await Axios.put(`${API_URL}/${path}`, body)
		.then(response => {
			return response.data;
		})
		.catch(error => {
			return { msg: error.response.data.msg };
		});
}

async function del(path, body) {
	return await Axios.delete(`${API_URL}/${path}/${body}`)
		.then(response => {
			return response.data;
		})
		.catch(error => {
			return { msg: error.response.data.msg };
		});
}
