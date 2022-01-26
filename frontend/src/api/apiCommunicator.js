import Axios from 'axios';

export const apiCommunicator = {
    get,
    post,
};

const API_URL = 'http://localhost:5000';

function get(path) {
    return Axios.get(`${API_URL}/${path}`)
        .then(response => console.log(response))
        .catch();
}

function post(path, body) {
    return Axios.post(`${API_URL}/${path}`, body)
        .then(response => console.log(response))
        .catch();
}
