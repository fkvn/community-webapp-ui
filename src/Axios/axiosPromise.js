import axios from "../Axios/axios";
import * as constVar from "../Util/ConstVar";

export const getPromise = async (promise = () => {}) => {
	return promise.then((res) => {
		if (res) return res.data ? res.data : res;
		else throw new Error("Unexpected Error! Please try again later!");
	});
};

// auth API

export const sendOtpCodePromise = (channel = "", value = "") => {
	if (channel === "email" || channel === "sms") {
		return axios.post(`/auth/getToken`, {
			channel: channel,
			...(channel === "email" && value.length > 0 && { email: value }),
			...(channel === "sms" && value.length > 0 && { phone: value }),
		});
	}
};

export const verifyOtpCodePromise = (channel = "", value = "", token = "") => {
	console.log(channel + " - " + value + " - " + token);
	if (channel === "email" || channel === "sms") {
		return axios.post(`/auth/verifyToken`, {
			channel: channel,
			...(channel === "email" && value.length > 0 && { email: value }),
			...(channel === "sms" && value.length > 0 && { phone: value }),
			token: token,
		});
	}
};

export const signupPromise = (signupInfo = {}) => {
	return axios.post(`/auth/signup`, {
		...signupInfo,
	});
};

export const loginPromise = async (
	channel = "",
	email = "",
	phone = "",
	password = ""
) => {
	return axios
		.post(`/auth/login`, {
			channel: channel,
			email: email,
			phone: phone,
			password: password,
		})
		.then((res) => {
			if (res) {
				localStorage.setItem(
					constVar.THAINOW_USER_STORRAGE_OBJ,
					JSON.stringify(res.data)
				);
				return "success";
			}
			throw new Error("Sign In Failed!");
		});
};

// User API

export const validateUsernamePromise = (username = "") => {
	return axios.post(
		`/users/validateUsername`,
		{},
		{
			params: { username: username },
		}
	);
};

export const validateEmailPromise = (email = "") => {
	return axios.post(`/users/validateEmail`, {
		email: email,
	});
};

export const validatePhonePromise = (phone = "") => {
	return axios.post(`/users/validatePhone`, {
		phone: phone,
	});
};

// Company API

export const searchCompanyPromise = (
	keywords = "",
	fetchAll = false,
	fetchLimit = 20
) => {
	return axios.get("/companies/searchName", {
		params: { keywords: keywords, fetchAll: fetchAll, fetchLimit: fetchLimit },
	});
};

export const validateCompanyEmailPromise = (email = "") => {
	return axios.post(`/companies/validateEmail`, {
		email: email,
	});
};

export const validateCompanyPhonePromise = (phone = "") => {
	return axios.post(`/companies/validatePhone`, {
		phone: phone,
	});
};
