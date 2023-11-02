import axios from "../Axios/axios";
import {
	EMAIL_PROP,
	PHONE_PROP,
	SEARCH_BUSINESS,
	SEARCH_DEAL,
	SEARCH_HOUSING,
	SEARCH_JOB,
	SEARCH_MARKETPLACE,
	SEARCH_PROFILE,
	SEARCH_REVIEW,
	SEARCH_SERVICE,
	SIGNIN_CHANNEL_APPLE,
	SIGNIN_CHANNEL_FACEBOOK,
	SIGNIN_CHANNEL_GOOGLE,
	SIGNIN_CHANNEL_LINE,
	SIGNIN_CHANNEL_THAINOW,
	SMS_PROP,
} from "../Util/ConstVar";

export const searchCompanyAxios = async (params = "", signal) =>
	axios
		.get(`/search/${SEARCH_BUSINESS}?${params}`, {
			signal,
		})
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const searchDealsAxios = async (params = "", signal) =>
	axios
		.get(`/search/${SEARCH_DEAL}?${params}`, {
			signal,
		})
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const searchJobsAxios = async (params = "", signal) =>
	axios
		.get(`/search/${SEARCH_JOB}?${params}`, {
			signal,
		})
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const searchHousingsAxios = async (params = "", signal) =>
	axios
		.get(`/search/${SEARCH_HOUSING}?${params}`, {
			signal,
		})
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const searchMarketplacesAxios = async (params = "", signal) =>
	axios
		.get(`/search/${SEARCH_MARKETPLACE}?${params}`, {
			signal,
		})
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const searchReviewsAxios = async (params = "", signal) =>
	axios
		.get(`/search/${SEARCH_REVIEW}?${params}`, {
			signal,
		})
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

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

export const signinAxios = async (channel = "", credential = {}) => {
	const validChannels = [
		SIGNIN_CHANNEL_THAINOW,
		SIGNIN_CHANNEL_GOOGLE,
		SIGNIN_CHANNEL_APPLE,
		SIGNIN_CHANNEL_FACEBOOK,
		SIGNIN_CHANNEL_LINE,
	];

	if (!channel || validChannels.indexOf(channel) < 0)
		return Promise.reject("Invalid sign in channel!");

	const url = {
		[`${SIGNIN_CHANNEL_THAINOW}`]: `/auth/thainow/signin`,
		[`${SIGNIN_CHANNEL_GOOGLE}`]: `/auth/google/access`,
		[`${SIGNIN_CHANNEL_APPLE}`]: `/auth/apple/access`,
		[`${SIGNIN_CHANNEL_FACEBOOK}`]: `/auth/facebook/access`,
		[`${SIGNIN_CHANNEL_LINE}`]: `/auth/line/access`,
	};

	const body = {
		[`${SIGNIN_CHANNEL_THAINOW}`]: {
			channel: credential?.channel,
			...(channel === EMAIL_PROP &&
				credential?.value.length > 0 && { email: credential?.value }),
			...(channel === PHONE_PROP &&
				credential?.value.length > 0 && { phone: credential?.value }),
			password: credential?.password,
		},
		[`${SIGNIN_CHANNEL_GOOGLE}`]: {
			...credential,
		},
		[`${SIGNIN_CHANNEL_APPLE}`]: {
			...credential,
		},
		[`${SIGNIN_CHANNEL_FACEBOOK}`]: {
			...credential,
		},
		[`${SIGNIN_CHANNEL_LINE}`]: {
			...credential,
		},
	};

	return axios
		.post(url[`${channel}`], body[`${channel}`])
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));
};

export const signinViaThaiNowAxios = async (
	channel = "",
	value = "",
	password = ""
) =>
	axios
		.post(`/auth/thainow/signin`, {
			channel: channel,
			...(channel === EMAIL_PROP && value.length > 0 && { email: value }),
			...(channel === PHONE_PROP && value.length > 0 && { phone: value }),
			password: password,
		})
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const signinViaGoogleAxios = (credential = {}) =>
	axios
		.post(`/auth/google/access`, {
			...credential,
		})
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const accessWithAppleAxios = (credential = {}) =>
	axios
		.post(`/auth/apple/access`, {
			...credential,
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

export const validateEmailUniqueAxios = (email = "") =>
	axios
		.post(`/auth/verify/email?email=${email}`)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const validatePhoneUniqueAxios = (phone = "") =>
	axios
		.post(`/auth/verify/phone?phone=${phone}`)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const changePasswordAxios = (credential = {}) =>
	axios
		.post(`/auth/change-password`, {
			...credential,
		})
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

// profiles

export const findProfileAxios = (id = -1) =>
	axios
		.get(`/${SEARCH_PROFILE}/${id}`)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

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

export const removeUserProfileAxios = (id = -1) =>
	axios
		.delete(`/profiles/users/${id}`)
		.then(() => Promise.resolve())
		.catch((e) => Promise.reject(e));

export const uploadFileAxios = (formData = new FormData(), config = {}) =>
	axios
		.post(`/storages`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
			...config,
		})
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const uploadProfileAvatarAxios = async (id = -1, storageRequest = {}) =>
	axios
		.post(`/profiles/${id}/picture`, storageRequest)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const patchUserProfileAxios = (id = -1, info = {}) =>
	axios
		.patch(`/profiles/users/${id}`, info)
		.then(() => Promise.resolve())
		.catch((e) => Promise.reject(e));

// Company API

export const patchBusinessProfileAxios = (id = -1, info = {}) =>
	axios
		.patch(`/profiles/business/${id}`, info)
		.then(() => Promise.resolve())
		.catch((e) => Promise.reject(e));

export const searchCompanyPromise = (
	keywords = "",
	fetchAll = false,
	fetchLimit = 20
) => {
	return axios.get("/companies/searchName", {
		params: { keywords: keywords, fetchAll: fetchAll, fetchLimit: fetchLimit },
	});
};

// service

export const findServiceAxios = (id = -1, ownerId = -1, type = "") =>
	axios
		.get(
			`/${SEARCH_SERVICE}/${id}?${
				ownerId >= 0 ? `profileId=${ownerId}` : ``
			}&type=${type}`
		)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const removeServiceAxios = (id = null, ownerId = null) =>
	axios
		.delete(`/${SEARCH_SERVICE}/${id}?profileId=${ownerId}`)
		.then(() => Promise.resolve())
		.catch((e) => Promise.reject(e));

// deal service

export const createDealAxios = (info = {}) =>
	axios
		.post(`/${SEARCH_SERVICE}/${SEARCH_DEAL}`, info)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const patchDealAxios = (id = -1, info = {}) =>
	axios
		.patch(`/${SEARCH_SERVICE}/${SEARCH_DEAL}/${id}`, info)
		.then(() => Promise.resolve())
		.catch((e) => Promise.reject(e));

// job service

export const createJobAxios = (info = {}) =>
	axios
		.post(`/${SEARCH_SERVICE}/${SEARCH_JOB}`, info)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const patchJobAxios = (id = -1, info = {}) =>
	axios
		.patch(`/${SEARCH_SERVICE}/${SEARCH_JOB}/${id}`, info)
		.then(() => Promise.resolve())
		.catch((e) => Promise.reject(e));

// housing service

export const createHousingAxios = (info = {}) =>
	axios
		.post(`/${SEARCH_SERVICE}/${SEARCH_HOUSING}`, info)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const patchHousingAxios = (id = -1, info = {}) =>
	axios
		.patch(`/${SEARCH_SERVICE}/${SEARCH_HOUSING}/${id}`, info)
		.then(() => Promise.resolve())
		.catch((e) => Promise.reject(e));

// marketplace service

export const createMarketplaceAxios = (info = {}) =>
	axios
		.post(`/${SEARCH_SERVICE}/${SEARCH_MARKETPLACE}`, info)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const patchMarketplaceAxios = (id = -1, info = {}) =>
	axios
		.patch(`/${SEARCH_SERVICE}/${SEARCH_MARKETPLACE}/${id}`, info)
		.then(() => Promise.resolve())
		.catch((e) => Promise.reject(e));

// review

export const createReviewAxios = (info = {}) =>
	axios
		.post(`/${SEARCH_REVIEW}`, info)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const patchReviewAxios = (id = null, info = {}) =>
	axios
		.patch(`/${SEARCH_REVIEW}/${id}`, info)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

//  report
export const sendReportAxios = (info = {}) =>
	axios
		.post(`/reports`, info)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

//  hide service
export const hideServiceAxios = (requesterId, serviceId) =>
	axios
		.post(
			`/${SEARCH_PROFILE}/${requesterId}/block/${SEARCH_SERVICE}/${serviceId}`
		)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));
