import {
	CHANNEL_PROP,
	EMAIL_PROP,
	FIRSTNAME_PROP,
	LASTNAME_PROP,
	PASSWORD_PROP,
	PHONE_PROP,
	REGION_PROP,
	SIGNIN_CHANNEL_APPLE,
	SIGNIN_CHANNEL_FACEBOOK,
	SIGNIN_CHANNEL_GOOGLE,
	SIGNIN_CHANNEL_LINE,
	SIGNIN_CHANNEL_THAINOW,
	SMS_PROP,
} from "../Util/constVar";
import axios from "./axios";

/**
 *
 * @param {*} provider
 * @param {*} credentials {CHANNEL_PROP, EMAIL_PROP, PHONE_PROP, REGION_PROP,PASSWORD_PROP, ...credentials}
 * @returns
 */
export const signinAxios = async (provider = "", credentials = {}) => {
	const url = {
		[`${SIGNIN_CHANNEL_THAINOW}`]: {
			[`${EMAIL_PROP}`]: `/auth/signingByEmail`,
			[`${PHONE_PROP}`]: `/auth/signingByPhone`,
		}[`${credentials[`${CHANNEL_PROP}`]}`],
		[`${SIGNIN_CHANNEL_GOOGLE}`]: `/auth/google/access`,
		[`${SIGNIN_CHANNEL_APPLE}`]: `/auth/apple/access`,
		[`${SIGNIN_CHANNEL_FACEBOOK}`]: `/auth/facebook/access`,
		[`${SIGNIN_CHANNEL_LINE}`]: `/auth/line/access`,
	}[`${provider}`];

	const body = {
		[`${SIGNIN_CHANNEL_THAINOW}`]: {
			[`${EMAIL_PROP}`]: {
				email: credentials[`${EMAIL_PROP}`],
				password: credentials[`${PASSWORD_PROP}`],
			},
			[`${PHONE_PROP}`]: {
				phone: credentials[`${PHONE_PROP}`],
				region: credentials[`${REGION_PROP}`],
				password: credentials[`${PASSWORD_PROP}`],
			},
		}[`${credentials[`${CHANNEL_PROP}`]}`],
		[`${SIGNIN_CHANNEL_GOOGLE}`]: {
			...credentials,
		},
		[`${SIGNIN_CHANNEL_APPLE}`]: {
			...credentials,
		},
		[`${SIGNIN_CHANNEL_FACEBOOK}`]: {
			...credentials,
		},
		[`${SIGNIN_CHANNEL_LINE}`]: {
			...credentials,
		},
	}[`${provider}`];

	if (!url || !body) return Promise.reject("Invalid sign in channel!");

	return axios
		.post(url, body)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));
};

export const signupAxios = async (channel = "", credentials = {}) => {
	const url = {
		[`${EMAIL_PROP}`]: `/auth/signupByEmail`,
		[`${PHONE_PROP}`]: `/auth/signupByPhone`,
	}[`${channel}`];

	const body = {
		[`${EMAIL_PROP}`]: {
			firstname: credentials[`${FIRSTNAME_PROP}`],
			lastname: credentials[`${LASTNAME_PROP}`],
			email: credentials[`${EMAIL_PROP}`],
			password: credentials[`${PASSWORD_PROP}`],
		},
	}[`${channel}`];

	console.log(channel);
	console.log(credentials);

	return axios.post(url, body).catch((e) => Promise.reject(e));
};

/**
 *
 * @param {String} channel options: EMAIL_PROP, SMS_PROP
 * @param {String} value
 * @returns {Promise<void>}
 */
export const sendOtpCodeAxios = async (channel = "", payload = {}) =>
	axios
		.post(`/auth/otp`, {
			channel: channel,
			...payload,
		})
		.catch((e) => Promise.reject(e));

/**
 *
 * @param {String} channel options: EMAIL_PROP, SMS_PROP
 * @param {*} value
 * @param {*} token
 * @returns {Promise<void>}
 */
export const verifyOtpCodeAxios = async (channel = "", payload = {}) =>
	axios
		.post(`/auth/otp/verify`, {
			channel: channel,
			...payload,
		})
		.catch((e) => Promise.reject(e));

/**
 *
 * @param {String} field options: EMAIL_PROP, PHONE_PROP, USERNAME_PROP
 * @param {String} value field's value
 *
 * @returns {Promise<Boolean>} return TRUE/FALSE if existed or not
 */

export const verifyExistingAxios = async (channel = "", payload = {}) => {
	const url = {
		[`${EMAIL_PROP}`]: `/emails/exist?email=${payload[`${EMAIL_PROP}`]}`,
		[`${SMS_PROP}`]: `/phones/exist?phone=${payload[`${PHONE_PROP}`]}&region=${
			payload[`${REGION_PROP}`]
		}`,
	}[`${channel}`];

	return axios
		.get(url)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));
};
