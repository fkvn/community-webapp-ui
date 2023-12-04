import axios from "./axios";

export const findProfileDetailAxios = async (id = -1) =>
	axios
		.get(`/profiles/${id}`)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const updateProfileAxios = async (id = -1, profile = {}) =>
	axios
		.patch(`/profiles/${id}`, profile)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const uploadProfilePictureAxios = async (id = -1, storageRequest = {}) =>
	axios
		.post(`/profiles/${id}/picture`, storageRequest)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));
