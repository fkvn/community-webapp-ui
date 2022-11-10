import axios from "axios";
import { localEnv } from "../Assest/Asset";
import * as constVar from "../Util/ConstVar";
import { signoutUserPromise } from "../Util/Util";

const instance = axios.create({
	// baseURL: "http://ecst-csproj2.calstatela.edu:6328/api/"
	baseURL: localEnv
		? "http://192.168.1.5:8080/api"
		: "https://thainow-cloud-run-yjxp4czkwa-uc.a.run.app/api",
	// baseURL: "https://alice.cysun.org/surveys/api",
	// baseURL: "https://mono-thainow-cloudrun-jib-vxbslz3voq-uc.a.run.app/api",
	// baseURL: "https://thainow-cloud-run-yjxp4czkwa-uc.a.run.app/api",
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
			// config.cookie({ sameSite: "Lax" });
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
