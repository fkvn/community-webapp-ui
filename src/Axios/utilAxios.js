import axios from "./axios";

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
