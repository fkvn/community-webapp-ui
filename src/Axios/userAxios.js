import { ID_PROP, PASSWORD_PROP } from "../Util/constVar";
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
 * @param {Object} credentials {ID_PROP: "", PASSWORD_PROP: ""}
 * @returns
 */
export const changePasswordAxios = async (credentials = {}) => {
	console.log(credentials);
	return axios
		.post(`/users/${credentials[`${ID_PROP}`]}/password`, {
			password: credentials[`${PASSWORD_PROP}`],
		})
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));
};
