import { apiCommunicator } from './apiCommunicator';

export const userApiCommunicator = {
    login,
    register,
};

function login(username, password) {
    const user = {
        username,
        password,
    };
    apiCommunicator.post('login', user);
}

function register(username, password) {
    const user = {
        username,
        password,
    };
    apiCommunicator.post('register', user);
}
