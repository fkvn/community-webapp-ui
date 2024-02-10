import axios from "./axios";

export const uploadFileAxios = async (formData = new FormData(), config = {}) =>
	axios
		.post(`/storages`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
			...config,
		})
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));

export const emailContactAxios = async (
	request = { _recipient: "", _subject: "", _msgBody: "" }
) =>
	axios
		.post(`/emails`, request)
		.then(({ data }) => Promise.resolve(data))
		.catch((e) => Promise.reject(e));
