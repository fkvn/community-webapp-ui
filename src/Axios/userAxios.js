import { CURRENT_PASSWORD_PROP, PASSWORD_PROP } from "../Util/constVar";
import axios from "./axios";

export const findProfilesAxios = async () =>
	axios
		.get(`/profiles`)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const findUserByEmailAxios = async (email = "") => {
	return axios
		.get(`/users/byEmail?email=${email}`)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));
};

export const findUserByPhoneAxios = async (phone = "", region = "") => {
	return axios
		.get(`/users/byPhone?phone=${phone}&region=${region}`)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));
};

/**
 *
 * @param {*} accountId
 * @param {*} password
 * @returns
 */
export const changePasswordAxios = async (
	accountId = -1,
	credentials = {},
	isVerify = false
) => {
	return axios
		.post(`/users/${accountId}/password?isVerify=${isVerify}`, {
			newPassword: credentials[`${PASSWORD_PROP}`],
			...(isVerify
				? {
						currentPassword: credentials[`${CURRENT_PASSWORD_PROP}`],
				  }
				: {}),
		})
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));
};
