import {
	EMAIL_PROP,
	PHONE_PROP,
	SIGNIN_CHANNEL_APPLE,
	SIGNIN_CHANNEL_FACEBOOK,
	SIGNIN_CHANNEL_GOOGLE,
	SIGNIN_CHANNEL_LINE,
	SIGNIN_CHANNEL_THAINOW,
	SMS_PROP,
	USERNAME_PROP,
} from "../Util/constVar";
import axios from "./axios";

/**
 *
 * @param {*} provider
 * @param {*} {channel, value, password, ...credential}
 * @returns
 */
export const signinAxios = async (
	provider = "",
	{ channel, value, password, ...credential }
) => {
	const url = {
		[`${SIGNIN_CHANNEL_THAINOW}`]: `/auth/thainow/signin`,
		[`${SIGNIN_CHANNEL_GOOGLE}`]: `/auth/google/access`,
		[`${SIGNIN_CHANNEL_APPLE}`]: `/auth/apple/access`,
		[`${SIGNIN_CHANNEL_FACEBOOK}`]: `/auth/facebook/access`,
		[`${SIGNIN_CHANNEL_LINE}`]: `/auth/line/access`,
	}[`${provider}`];

	const body = {
		[`${SIGNIN_CHANNEL_THAINOW}`]: {
			channel: channel,
			...(channel === EMAIL_PROP && {
				email: value,
			}),
			...(channel === PHONE_PROP && {
				phone: value,
			}),
			password: password,
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
	}[`${provider}`];

	if (!url || !body) return Promise.reject("Invalid sign in channel!");

	return axios
		.post(url, body)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));
};

/**
 *
 * @param {String} channel options: EMAIL_PROP, SMS_PROP
 * @param {String} value
 * @returns {Promise<void>}
 */
export const sendOtpCodeAxios = async (channel = "", value = "") =>
	axios
		.post(`/auth/otp/create`, {
			channel: channel,
			...(channel === EMAIL_PROP && value.length > 0 && { email: value }),
			...(channel === SMS_PROP &&
				value.length > 0 && { phone: value, region: "us" }),
		})
		.catch((e) => Promise.reject(e));

/**
 *
 * @param {String} channel options: EMAIL_PROP, SMS_PROP
 * @param {*} value
 * @param {*} token
 * @returns {Promise<void>}
 */
export const verifyOtpCodeAxios = async (
	channel = "",
	value = "",
	token = ""
) =>
	axios
		.post(`/auth/otp/verify`, {
			channel: channel,
			...(channel === EMAIL_PROP && value.length > 0 && { email: value }),
			...(channel === SMS_PROP &&
				value.length > 0 && { phone: value, region: "us" }),
			token: token,
		})
		.catch((e) => Promise.reject(e));

/**
 *
 * @param {String} field options: EMAIL_PROP, PHONE_PROP, USERNAME_PROP
 * @param {String} value field's value
 *
 * @returns {Promise<Boolean>} return TRUE/FALSE if existed or not
 */

export const verifyExistingAxios = async (field = "", value = "") => {
	const url = {
		[`${EMAIL_PROP}`]: `/auth/verify/exist/email?email=${value}`,
		[`${PHONE_PROP}`]: `/auth/verify/exist/phone?phone=${value}`,
		[`${USERNAME_PROP}`]: `/auth/verify/exist/username?username=${value}`,
	}[`${field}`];

	return axios
		.post(url)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));
};

/**
 *
 * @param {*} credential
 * @returns
 */
export const changePasswordAxios = (credential = {}) =>
	axios
		.post(`/auth/password`, {
			...credential,
		})
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));
