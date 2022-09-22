import axios from "../Axios/axios";
import {
	PROFILE_COMPANY_TYPE_PROP,
	PROFILE_USER_TYPE_PROP,
} from "../Util/ConstVar";

export const findCompany = ({ keywords = "", address = "", placeid = "" }) => {
	// default search at ThaiTown LA
	return axios.get(
		`/search/companies?keywords=${keywords}&address=${address}&placeid=${placeid}`
	);
};

//  ===================================================

export const getPromise = async (promise = () => {}) => {
	return promise.then((res) => {
		if (res) return res.data ? res.data : res;
		else throw new Error("Unexpected Error! Please try again later!");
	});
};

// auth API

export const sendOtpCodePromise = async (channel = "", value = "") =>
	axios
		.post(`/auth/getToken`, {
			channel: channel,
			...(channel === "email" && value.length > 0 && { email: value }),
			...(channel === "sms" && value.length > 0 && { phone: value }),
		})
		.catch((e) => Promise.reject(e));
// {
// 	console.log(channel);
// 	if (channel === "email" || channel === "sms") {
// 		console.log(
// 			axios.post(`/auth/getToken`, {
// 				channel: channel,
// 				...(channel === "email" && value.length > 0 && { email: value }),
// 				...(channel === "sms" && value.length > 0 && { phone: value }),
// 			})
// 		);
// 	}

// 	return new Promise((_, reject) =>
// 		reject("There was an error in sending the OTP code. Please try again!")
// 	);
// };

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

export const signupPromise = async (
	signupInfo = {
		username: "",
		password: "",
		email: "",
		emailVerified: false,
		phone: "",
		phoneVerified: false,
		verified: true,
	}
) => {
	return axios.post(`/auth/signup`, {
		...signupInfo,
	});
};

export const businessRegisterPromise = async (
	businessRegisterInfo = {
		name: "",
		informal: false,
		industry: "",
		address: "",
		placeid: "",
		email: "",
		phone: "",
		website: "",
		administratorId: "",
	}
) => {
	return axios.post(`/companies`, {
		...businessRegisterInfo,
	});
};

export const axiosSignInPromise = async (
	channel = "",
	email = "",
	phone = "",
	password = ""
) => {
	return axios
		.post(`/auth/signin`, {
			channel: channel,
			email: email,
			phone: phone,
			password: password,
		})
		.then((res) => (res ? res.data : Promise.reject()));
};

// User API

export const uploadProfileAvatar = async (
	type = "",
	id = -1,
	formData = new FormData()
) => {
	const host =
		type === PROFILE_USER_TYPE_PROP
			? `/users/${id}/profile`
			: type === PROFILE_COMPANY_TYPE_PROP
			? `/companies/${id}/logo`
			: "";

	if (id > 0 && host.length > 0) {
		return axios.post(host, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	}

	return Promise.reject("Invalid Credentials!");
};

export const validateUsernamePromise = (username = "") => {
	return axios.post(
		`/auth/users/validateUsername`,
		{},
		{
			params: { username: username },
		}
	);
};

export const validateEmailPromise = (email = "") => {
	return axios.post(`/auth/users/validateEmail`, {
		email: email,
	});
};

export const validatePhonePromise = (phone = "") => {
	return axios.post(`/auth/users/validatePhone`, {
		phone: phone,
	});
};

export const getUserCompanies = async (userId = 0) => {
	return axios
		.get(`/users/${userId}/companies`)
		.then((res) => (res ? res.data : Promise.reject()));
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
	return axios.post(`/auth/companies/validateEmail`, {
		email: email,
	});
};

export const validateCompanyPhonePromise = (phone = "") => {
	return axios.post(`/auth/companies/validatePhone`, {
		phone: phone,
	});
};
