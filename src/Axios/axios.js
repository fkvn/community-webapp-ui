import axios from "axios";
import * as actionCreators from "../redux-store/actionCreator/actionCreator";
import store from "../redux-store/store";
import * as constVar from "../Util/ConstVar";

const instance = axios.create({
	// baseURL: "http://ecst-csproj2.calstatela.edu:6328/api/"
	baseURL: "http://localhost:8080/api",
	// baseURL: "https://alice.cysun.org/surveys/api",
	// baseURL: "https://mono-thainow-cloudrun-jib-vxbslz3voq-uc.a.run.app/api",
});

const responseHandler = (response) => {
	return response;
};

const errorHandler = (error) => {
	// return Promise.reject(error);

	if (error.message === "Network Error" || error.response.status === 502) {
		// console.log(error);

		store.dispatch(
			actionCreators.initError(
				"Network Error! The service is down. Please come to visit the site later",
				"BAD GATEWAY"
			)
		);
	} else if (error.response.status === 401) {
		// unauthorized
		localStorage.removeItem(constVar.THAINOW_USER_OBJ);
		localStorage.removeItem(constVar.THAINOW_PROFILE_OBJ);
		store.dispatch(
			actionCreators.initError(
				// error.response.data.message,
				"Your credentials are incorrect or have expired  .... Please sign in again!",
				error.response.data.status
			)
		);

		// setInterval(() => {
		// 	window.location.replace("/signin");
		// }, 2000);
	} else {
		const message = error.response.data.message || "Bad Request";
		const status = error.response.data.status || "Bad Request";

		store.dispatch(actionCreators.initError(message, status));
	}
};

instance.interceptors.request.use(
	(config) => {
		const thaiNowObj = localStorage.getItem(constVar.THAINOW_USER_OBJ);
		if (thaiNowObj) {
			config.headers.Authorization = `Bearer ${
				JSON.parse(thaiNowObj)["access_token"]
			}`;
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
