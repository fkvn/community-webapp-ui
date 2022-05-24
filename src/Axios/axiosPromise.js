import axios from "../Axios/axios";
import * as constVar from "../Util/ConstVar";

export const validateEmailPromise = (email = "") => {
	return axios.post(`/users/validateEmail`, {
		email: email,
	});
};

export const validatePhonePromise = (phone = "", callback = () => {}) => {
	return axios.post(`/users/validatePhone`, {
		phone: phone,
	});
};

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
	if (channel === "email" || channel === "sms") {
		return axios.post(`/auth/verifyToken`, {
			channel: channel,
			...(channel === "email" && value.length > 0 && { email: value }),
			...(channel === "sms" && value.length > 0 && { phone: value }),
			token: token,
		});
	}
};

export const signupPromise = (signupInfo = {}, role = "") => {
	return axios.post(`/auth/signup`, {
		email: signupInfo?.email || "",
		password: signupInfo?.password || "",
		phone: signupInfo?.phone || "",
		firstname: signupInfo?.firstname || "",
		lastname: signupInfo?.lastname || "",
		role: role,
		isVerified: true,
		address: signupInfo?.address?.description || "",
		placeid: signupInfo?.address?.placeid || "",
		...(role === "BUSINESS" && { privileges: signupInfo?.privileges || [] }),
		...(role === "BUSINESS" && { company: signupInfo.company || {} }),
	});
};

export const loginPromise = (
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
		});
};

export const getPromise = (promise = () => {}) => {
	return promise.then((res) => {
		return new Promise((resolve, reject) => {
			if (res) {
				resolve();
			} else {
				reject();
			}
		});
	});
};
