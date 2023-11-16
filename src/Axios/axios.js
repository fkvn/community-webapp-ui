import axios from "axios";
import { devEnv, localEnv } from "../Assest/Env";
import * as constVar from "../Util/ConstVar";

const instance = axios.create({
	baseURL: localEnv
		? "http://localhost:8080/api"
		: devEnv
		? "https://api.dev.searchforthai.com/api"
		: // production env
		  "https://api.searchforthai.com/api",
});

const responseHandler = (response) => {
	return response;
};

const errorHandler = async (error) => {
	let message = error.message || "Bad Request";

	if (message === "Network Error" || error.response.status === 502) {
		message =
			"Network Error! The service is down. Please come to visit the site later";
	} else if (error.response.status === 401) {
		// unauthorized
		localStorage.removeItem(constVar.THAINOW_USER_OBJ);
		localStorage.removeItem(constVar.PROFILE_OBJ);

		message =
			error.response.data.message ||
			error.response.data.error ||
			"Unauthorized";
	} else if (error?.response?.data?.message) {
		message = error.response.data.message;
	}

	console.log(message);

	return Promise.reject(message);
};

instance.interceptors.request.use(
	(config) => {
		const thaiNowObj = localStorage.getItem(constVar.THAINOW_USER_OBJ);

		if (thaiNowObj) {
			let access_token = JSON.parse(thaiNowObj)["access_token"] || "";
			config.headers.Authorization = `Bearer ${access_token}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

instance.interceptors.response.use(
	(response) => responseHandler(response),
	(error) => errorHandler(error)
);

export default instance;
