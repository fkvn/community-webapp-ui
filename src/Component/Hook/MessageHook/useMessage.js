import { message } from "antd";
import { useTranslation } from "react-i18next";

function useMessage() {
	const { t } = useTranslation("Message");
	const key = "thainow-message";

	const CONFIG = {
		// className: "px-5 bg-primary",
		key,
		style: {
			marginTop: "10vh",
		},
		onClose: () => (document.getElementById("overlay").style.display = "none"),
	};

	const loadingMessage = async (
		contentOrKey = "message_loading_msg",
		duration = 0,
		showOverlay = false,
		config = {}
	) => {
		if (showOverlay) document.getElementById("overlay").style.display = "block";
		const [key = "message_loading_msg", attributes = "{}"] =
			contentOrKey.split("-{}-");

		const content =
			key.indexOf("_msg") < 0
				? contentOrKey
				: t(key, { ...JSON.parse(`${attributes}`) });
		return message
			.loading({
				content: content,
				duration: duration,
				className: "bg-warning",
				...CONFIG,
				...config,
			})
			.then(() => Promise.resolve());
	};

	const successMessage = async (
		contentOrKey = "message_navigate_msg",
		duration = 3,
		showOverlay = false,
		config = {}
	) => {
		if (showOverlay) document.getElementById("overlay").style.display = "block";
		const [key = "message_navigate_msg", attributes = "{}"] =
			contentOrKey.split("-{}-");

		const content =
			key.indexOf("_msg") < 0
				? contentOrKey
				: t(key, { ...JSON.parse(`${attributes}`) });
		return message
			.success({
				content: content,
				duration: duration,
				className: "bg-success",
				...CONFIG,
				...config,
			})
			.then(() => Promise.resolve());
	};

	const errorMessage = async (
		contentOrKey = "message_system_error_msg",
		duration = 3,
		showOverlay = false,
		config = {}
	) => {
		if (showOverlay) document.getElementById("overlay").style.display = "block";
		const [key = "message_system_error_msg", attributes = "{}"] =
			contentOrKey.split("-{}-");

		const content =
			key.indexOf("_msg") < 0
				? contentOrKey
				: t(key, { ...JSON.parse(`${attributes}`) });
		return message
			.error({
				content: content,
				duration: duration,
				className: "bg-danger",
				...CONFIG,
				...config,
			})
			.then(() => Promise.resolve());
	};

	const destroyMessage = async () => {
		message.destroy(key);
		return Promise.resolve();
	};

	return {
		loadingMessage,
		successMessage,
		errorMessage,
		destroyMessage,
	};
}

export default useMessage;
