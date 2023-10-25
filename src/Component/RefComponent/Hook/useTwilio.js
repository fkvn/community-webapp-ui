import { loadingMessage } from "./useMessage";

function useTwilio() {
	// const { loadingMessage, successMessage, errorMessage } = useMessage();

	const sendVerifyCode = async (channel = "", value = "") => {
		return loadingMessage("Sending OTP Code...");
		// return sendOtpCodePromise(channel, value)
		// 	.then(() => successMessage("OTP Code was sent sccessfully!"))
		// 	.catch((e) => errorMessage(e));
	};

	const verifyCode = async (channel = "", value = "", token = "") => {
		return loadingMessage("Verifying OTP Code...");
		// return verifyOtpCodePromise(channel, value, token)
		// 	.then(() => successMessage("OTP Code was verified sccessfully!"))
		// 	.catch((e) => errorMessage(e));
	};

	return { sendVerifyCode, verifyCode };
}

export default useTwilio;
