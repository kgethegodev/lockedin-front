import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use(function (config) {
	config.headers.Accept = 'application/json'
	config.headers["Content-Type"] = 'application/json'
	let store = window.localStorage.getItem('auth');
	if(store) {
		let auth = JSON.parse(store);
		if(auth._token) {
			config.headers.Authorization = 'Bearer ' + auth._token;
		}
	}

	return config;
});

axios.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	console.log(error)
	// grab the response status
	const status = error.response ? error.response.status : null

	// look for a 401 unauthorised
	if (status === 401 && window.location.pathname !== '/auth/login') {
		const currentPath = window.location.pathname.replace(/^\/+/g, '')
		window.location.href = `/auth/login?redirect=${currentPath.replace(/^\/+/g, '')}`
		window.localStorage.removeItem('auth');
	}

	// reject with original error for all other response statuses
	return Promise.reject(error);
});

export default {

	post(url, request) {
		return axios.post(url, request)
			.then((response) => Promise.resolve(response.data))
			.catch((error) => Promise.reject(error.response ? error.response : error));
	},

	get(url, params = {}, noAuth = false) {
		return axios.get(url, {params: params})
			.then((response) => Promise.resolve(response.data))
			.catch((error) => Promise.reject(error.response ? error.response : error));
	}
}