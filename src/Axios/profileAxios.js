import axios from "./axios";

export const findProfileDetailAxios = async (id = -1) =>
	axios
		.get(`/profiles/${id}`)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const patchProfileAxios = async (id = -1, profile = {}) =>
	axios
		.patch(`/profiles/${id}`, profile)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const uploadAvatarAxios = async (id = -1, url = "") =>
	axios
		.post(`/profiles/${id}/avatar`, {
			url: url,
		})
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));
