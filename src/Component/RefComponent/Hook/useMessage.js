import { message } from "antd";

const key = "thainow-message";

const CONFIG = {
	className: "px-5 bg-primary",
	key,
	style: {
		marginTop: "10vh",
	},
};

export const loadingMessage = (
	content = "Loading",
	duration = 1,
	config = {}
) =>
	message
		.loading({
			content: content,
			duration: duration,
			...CONFIG,
			...config,
		})
		.then(() => Promise.resolve());

export const successMessage = (
	content = "Success",
	duration = 1,
	config = {}
) =>
	message
		.success({
			content: content,
			duration: duration,
			...CONFIG,
			...config,
		})
		.then(() => Promise.resolve());

export const errorMessage = (content = "Error", duration = 2, config = {}) =>
	message
		.error({
			content: content,
			duration: duration,
			...CONFIG,
			...config,
		})
		.then(() => Promise.reject(content));
