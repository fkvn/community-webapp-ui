import { message } from "antd";

function useMessage(key = "thainow-message") {
	const config = {
		className: "px-5 bg-primary",
		key,
		style: {
			marginTop: "10vh",
		},
	};

	const loadingMessage = async (content = "Loading", duration = 1) =>
		message
			.loading({
				content: content,
				duration: duration,
				...config,
			})
			.then(() => Promise.resolve());

	const successMessage = async (content = "Success", duration = 1) =>
		message
			.success({
				content: content,
				duration: duration,
				...config,
			})
			.then(() => Promise.resolve());

	const errorMessage = async (content = "Error", duration = 2) =>
		message
			.error({
				content: content,
				duration: duration,
				...config,
			})
			.then(() => Promise.reject(content));

	return { loadingMessage, successMessage, errorMessage };
}

export default useMessage;
