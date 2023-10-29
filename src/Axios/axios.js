import axios from "axios";
import { devEnv, localEnv } from "../Assest/env";
import * as constVar from "../Util/ConstVar";
import { signoutUserPromise } from "../Util/Util";

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

		const returnError = error.response.data.error;
		message = error.response.data.message || "Unauthorized";

		if (returnError === "Unauthorized") {
			message =
				"Your credentials are incorrect or have expired  .... Please sign in again!";
			signoutUserPromise();
		}
	} else {
		message = error.response.data.message;
	}

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
