import axios from "axios";
import { PROFILE_OBJ, THAINOW_USER_OBJ } from "../Util/ConstVar";
import { axiosConfig } from "../serviceEnv";

const instance = axios.create({
	baseURL: axiosConfig?.baseURL || "",
});

const responseHandler = (response) => {
	return response;
};

const errorHandler = async (error) => {
	console.log("axios: " + error);
	let message = error.message || "Bad Request";

	if (message === "Network Error" || error.response.status === 502) {
		message =
			"Network Error! The service is down. Please come to visit the site later";
	} else if (error.response.status === 401) {
		// unauthorized
		localStorage.removeItem(THAINOW_USER_OBJ);
		localStorage.removeItem(PROFILE_OBJ);

		message =
			error.response.data.message ||
			error.response.data.error ||
			"Unauthorized";
	} else if (error?.response?.data?.message) {
		message = error.response.data.message;
	}

	return Promise.reject(message);
};

instance.interceptors.request.use(
	(config) => {
		const thaiNowObj = localStorage.getItem(THAINOW_USER_OBJ);

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
