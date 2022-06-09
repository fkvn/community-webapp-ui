import axios from "../Axios/axios";
import * as constVar from "../Util/ConstVar";

export const getPromise = async (promise = () => {}) => {
	return promise.then((res) => {
		if (res) return true;
		else throw new Error();
	});
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

export const sendOtpCodePromise = (channel = "", value = "") => {
	console.log("sendcode");
	console.log(channel + " " + value);

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
		username: signupInfo[`${constVar.STORAGE_USERNAME_PROP}`] || "",
		email: signupInfo[`${constVar.STORAGE_EMAIL_PROP}`] || "",
		password: signupInfo[`${constVar.STORAGE_PASSWORD_PROP}`] || "",
		phone: signupInfo[`${constVar.STORAGE_PHONE_PROP}`] || "",
		role: role,
		isVerified: true,
		address: signupInfo[`${constVar.STORAGE_ADDRESS_PROP}`].description || "",
		placeid: signupInfo[`${constVar.STORAGE_ADDRESS_PROP}`].placeid || "",
		...(role === "BUSINESS" && {
			privileges: signupInfo[`${constVar.STORAGE_PRIVILEGES_PROP}`] || [],
		}),
		...(role === "BUSINESS" && {
			company: signupInfo[`${constVar.STORAGE_COMPANY_PROP}`] || {},
		}),
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
