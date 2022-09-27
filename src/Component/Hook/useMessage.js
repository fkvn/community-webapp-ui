import { message } from "antd";

const key = "thainow-message";

const CONFIG = {
	className: "px-5 bg-primary",
	key,
	style: {
		marginTop: "10vh",
	},
};

export const loadingMessage = (content = "Loading", duration = 1) =>
	message
		.loading({
			content: content,
			duration: duration,
			...CONFIG,
		})
		.then(() => Promise.resolve());

export const successMessage = (content = "Success", duration = 2) =>
	message
		.success({
			content: content,
			duration: duration,
			...CONFIG,
		})
		.then(() => Promise.resolve());

export const errorMessage = (content = "Error", duration = 2) =>
	message
		.error({
			content: content,
			duration: duration,
			...CONFIG,
		})
		.then(() => Promise.reject(content));
