import { sendOtpCodePromise } from "../../Axios/axiosPromise";
import useMessage from "./useMessage";

function useTwilio() {
	const { loadingMessage, successMessage, errorMessage } = useMessage();

	const sendVerifyCode = async (channel = "", value = "") => {
		loadingMessage("Sending OTP Code...", 0);
		return sendOtpCodePromise(channel, value)
			.then(() => successMessage("OTP Code was sent sccessfully!"))
			.catch((e) => errorMessage(e));
	};

	// return loadingMessage("Sending OTP Code...", 0).then(() => {
	// 	console.log("after loading");

	// 	console.log(sendOtpCodePromise(channel, value));

	// 	// sendOtpCodePromise(channel, value)
	// 	// .then(() => {
	// 	// 	console.log("send");
	// 	// 	successMessage("OTP Code was sent sccessfully!");
	// 	// })
	// 	// .catch((e) => {
	// 	// 	console.log("error");
	// 	// 	errorMessage(e);
	// 	// })
	// });

	return { sendVerifyCode };
}

export default useTwilio;
