import { message } from "antd";

const key = "thainow-message";

const CONFIG = {
	className: "px-5 bg-primary",
	key,
	style: {
		marginTop: "10vh",
	},
	onClose: () => (document.getElementById("overlay").style.display = "none"),
};

/**
 *
 * @param {*} content
 * @param {*} duration
 * @param {*} config
 * @param {*} showOverlay
 * @returns
 */
export const loadingMessage = async (
	content = "Loading",
	duration = 1,
	config = {},
	showOverlay = false
) => {
	if (showOverlay) document.getElementById("overlay").style.display = "block";
	return message
		.loading({
			content: content,
			duration: duration,
			...CONFIG,
			...config,
		})
		.then(() => Promise.resolve());
};

/**
 *
 * @param {*} content
 * @param {*} duration
 * @param {*} config
 * @param {*} showOverlay
 * @returns
 */
export const successMessage = async (
	content = "Success",
	duration = 1,
	config = {},
	showOverlay = false
) => {
	if (showOverlay) document.getElementById("overlay").style.display = "block";
	return message
		.success({
			content: content,
			duration: duration,
			...CONFIG,
			...config,
		})
		.then(() => Promise.resolve());
};

/**
 *
 * @param {*} content
 * @param {*} duration
 * @param {*} config
 * @param {*} showOverlay
 * @returns
 */
export const errorMessage = async (
	content = "Error",
	duration = 2,
	config = {},
	showOverlay = false
) => {
	if (showOverlay) document.getElementById("overlay").style.display = "block";
	return message
		.error({
			content: content,
			duration: duration,
			...CONFIG,
			...config,
		})
		.then(() => Promise.resolve());
};
