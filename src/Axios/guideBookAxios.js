import axios from "./axios";

/**
 *
 * @param {Object} params {key: value}
 * @returns
 */
export const fetchGuideBookAxios = async (params = {}) => {
	params = new URLSearchParams(params).toString();
	return axios
		.get(`/search/guidebooks?${params}`)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => {
			// only display errors on console
			console.log(e);
			return Promise.resolve([]);
		});
};
