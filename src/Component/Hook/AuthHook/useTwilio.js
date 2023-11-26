import { useTranslation } from "react-i18next";
import { sendOtpCodeAxios, verifyOtpCodeAxios } from "../../../Axios/authAxios";
import useMessage from "../MessageHook/useMessage";
// import { errorMessage, loadingMessage, successMessage } from "./useMessage";

function useTwilio() {
	const { t } = useTranslation("Otp");
	const { loadingMessage, successMessage, errorMessage } = useMessage();

	/**
	 *
	 * @param {String} channel options: EMAIL_PROP, SMS_PROP
	 * @param {String} value
	 * @returns {Promise<void>} message returns
	 */
	const sendCode = async (channel = "", payload = {}) => {
		loadingMessage(`${t("otp_code_sending_msg")}`);
		return successMessage(`${t("otp_code_sent_msg")}`);
		return sendOtpCodeAxios(channel, payload)
			.then(() => successMessage(`${t("otp_code_sent_msg")}`))
			.catch((e) => errorMessage(e).then(() => Promise.reject()));
	};

	/**
	 *
	 * @param {String} channel options: EMAIL_PROP, SMS_PROP
	 * @param {*} value
	 * @param {*} token
	 * @returns {Promise<void>} message returns
	 */
	const verifyCode = async (channel = "", payload = {}) => {
		loadingMessage(`${t("otp_code_verifying_msg")}`);
		return successMessage(`${t("otp_code_verified_msg")}`);

		return verifyOtpCodeAxios(channel, payload)
			.then(() => successMessage(`${t("otp_code_verified_msg")}`))
			.catch((e) => errorMessage(e).then(() => Promise.reject()));
	};

	return { sendCode, verifyCode };
}

export default useTwilio;
