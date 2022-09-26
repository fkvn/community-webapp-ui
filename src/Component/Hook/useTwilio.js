import {
	sendOtpCodePromise,
	verifyOtpCodePromise,
} from "../../Axios/axiosPromise";
import useMessage from "./useMessage";

function useTwilio() {
	const { loadingMessage, successMessage, errorMessage } = useMessage();

	const sendVerifyCode = async (channel = "", value = "") => {
		loadingMessage("Sending OTP Code...", 0);
		return sendOtpCodePromise(channel, value)
			.then(() => successMessage("OTP Code was sent sccessfully!"))
			.catch((e) => errorMessage(e));
	};

	const verifyCode = async (channel = "", value = "", token = "") => {
		loadingMessage("Verifying OTP Code...", 0);
		return verifyOtpCodePromise(channel, value, token)
			.then(() => successMessage("OTP Code was verified sccessfully!"))
			.catch((e) => errorMessage(e));
	};

	return { sendVerifyCode, verifyCode };
}

export default useTwilio;
