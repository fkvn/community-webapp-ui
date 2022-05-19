import axios from "axios";

import store from "../redux-store/store";
import * as actionCreators from "../redux-store/actionCreator/actionCreator";
import * as constVar from "../Util/ConstVar";

const thaiNowObj = window.sessionStorage.getItem(
	constVar.THAINOW_USER_STORRAGE_OBJ
);

const instance = axios.create({
	// baseURL: "http://ecst-csproj2.calstatela.edu:6328/api/"
	baseURL: "http://localhost:8080/api",
	// baseURL: "https://alice.cysun.org/surveys/api",
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
		localStorage.removeItem("thainow.user");
		store.dispatch(
			actionCreators.initError(
				error.response.data.message,
				error.response.data.status
			)
		);
	} else {
		const message = error.response.data.message || "Bad Request";
		const status = error.response.data.status || "Bad Request";

		store.dispatch(actionCreators.initError(message, status));
	}
};

if (thaiNowObj) {
	instance.defaults.headers.common["Authorization"] =
		"Bearer " + JSON.parse(thaiNowObj)["access_token"];
} else {
	instance.defaults.headers.common["Authorization"] = null;
}

instance.interceptors.response.use(
	(response) => responseHandler(response),
	(error) => errorHandler(error)
);

export default instance;
