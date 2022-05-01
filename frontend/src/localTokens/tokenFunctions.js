export const tokenFunctions = {
	getToken,
	setToken,
	removeToken,
};

function getToken(key) {
	const tokenDetailsString = localStorage.getItem(key);
	if (!tokenDetailsString) return false;
	const tokenDetails = JSON.parse(tokenDetailsString);
	return tokenDetails;
}

function setToken(key, token) {
	localStorage.setItem(key, JSON.stringify(token));
}

function removeToken(key) {
	localStorage.removeItem(key);
}
