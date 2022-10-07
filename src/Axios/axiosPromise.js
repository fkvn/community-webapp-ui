import axios from "../Axios/axios";
import {
	EMAIL_PROP,
	PHONE_PROP,
	PROFILE_BUSINESS_TYPE_PROP,
	PROFILE_USER_TYPE_PROP,
	SMS_PROP,
} from "../Util/ConstVar";

export const findCompany = ({ keywords = "", address = "", placeid = "" }) => {
	// default search at ThaiTown LA
	return axios.get(
		`/search/business?keywords=${keywords}&address=${address}&placeid=${placeid}`
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

export const sendOtpCodeAxios = async (channel = "", value = "") =>
	axios
		.post(`/auth/getToken`, {
			channel: channel,
			...(channel === EMAIL_PROP && value.length > 0 && { email: value }),
			...(channel === SMS_PROP && value.length > 0 && { phone: value }),
		})
		.catch((e) => Promise.reject(e));

export const verifyOtpCodePromise = async (
	channel = "",
	value = "",
	token = ""
) =>
	axios
		.post(`/auth/verifyToken`, {
			channel: channel,
			...(channel === EMAIL_PROP && value.length > 0 && { email: value }),
			...(channel === SMS_PROP && value.length > 0 && { phone: value }),
			token: token,
		})
		.catch((e) => Promise.reject(e));

export const registerAxios = async (registerInfo = {}) =>
	axios
		.post(`/auth/thainow/register`, {
			...registerInfo,
		})
		.catch((e) => Promise.reject(e));

export const businessRegisterAxios = async (registerInfo = {}) =>
	axios
		.post(`/profiles/business`, {
			...registerInfo,
		})
		.catch((e) => Promise.reject(e));

export const signinAxios = async (channel = "", value = "", password = "") =>
	axios
		.post(`/auth/thainow/signin`, {
			channel: channel,
			...(channel === EMAIL_PROP && value.length > 0 && { email: value }),
			...(channel === PHONE_PROP && value.length > 0 && { phone: value }),
			password: password,
		})
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

// validation

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

// profiles

export const findProfilesAxios = async () =>
	axios
		.get(`/profiles`)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const removeBusinessProfileAxios = (id = -1) =>
	axios
		.delete(`/profiles/business/${id}`)
		.then(() => Promise.resolve())
		.catch((e) => Promise.reject(e));

export const removeAccountProfileAxios = (id = -1) =>
	axios
		.delete(`/profiles/users/${id}`)
		.then(() => Promise.resolve())
		.catch((e) => Promise.reject(e));

export const uploadProfileAvatar = async (
	type = "",
	id = -1,
	formData = new FormData()
) => {
	const host =
		type === PROFILE_USER_TYPE_PROP
			? `/users/${id}/profile`
			: type === PROFILE_BUSINESS_TYPE_PROP
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
