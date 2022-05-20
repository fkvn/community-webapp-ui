import axios from "../Axios/axios";

export const validateEmailPromise = (email = "") => {
	return axios.post(`/users/validateEmail`, {
		email: email,
	});
};

export const validatePhonePromise = (phone = "") => {
	return axios.post(`/users/validatePhone`, {
		phone: phone,
	});
};
