import axios from "./axios";

/**
 *
 * @param {Object} params {key: value}
 * @returns
 */
export const fetchGuideBooksAxios = async (params = {}) => {
	params = new URLSearchParams(params).toString();
	return axios
		.get(`/search/guidebooks?${params}`)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => {
			// only display errors on console
			console.log(e);
			return Promise.reject(e);
		});
};

export const fetchGuideBookAxios = async (id = "") => {
	return axios
		.get(`/posts/${id}`)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));
};

export const createGuideBookAxios = async (profileId, data = {}) =>
	axios
		.post(`/posts/guidebooks?profileId=${profileId}`, data)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const deleteGuideBookAxios = async (id, isHardDelete) =>
	axios
		.delete(`/posts/${id}?isHardDelete=${isHardDelete || false}`)
		.then(() => Promise.resolve())
		.catch((e) => Promise.reject(e));
