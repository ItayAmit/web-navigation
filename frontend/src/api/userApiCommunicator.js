import { apiCommunicator } from './apiCommunicator';

export const userApiCommunicator = {
    login,
    register,
    load,
};

function login(username, password) {
    const user = {
        username,
        password,
    };
    apiCommunicator.post('login', user);
}

function register(username, password, firstname, lastname, email) {
    const user = {
        username,
        password,
        firstname,
        lastname,
        email,
    };
    apiCommunicator.post('register', user);
}

function load(userid) {
    const user = apiCommunicator.get('load', userid);
    return user;
}
