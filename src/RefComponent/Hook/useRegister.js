import { businessRegisterAxios, registerAxios } from "../../Axios/axiosPromise";
import { FORWARD_SUCCESS } from "../../Util/ConstVar";
import { errorMessage, loadingMessage, successMessage } from "./useMessage";
import useUrls from "./useUrls";

function useRegister() {
	const { forwardUrl } = useUrls();

	const thainowRegister = async (
		registerInfo = {},
		forward = false,
		closeUrl = "",
		continueUrl = ""
	) => {
		loadingMessage("Registering...", 0);
		return registerAxios(registerInfo)
			.then(() => {
				successMessage("Registration successfully!").then(() =>
					forward ? forwardUrl(closeUrl, continueUrl) : Promise.resolve()
				);
			})
			.catch((e) => errorMessage(e));
	};

	const businessRegister = async (
		registerInfo = {},
		forward = false,
		fowardAction = FORWARD_SUCCESS,
		continueUrl = "",
		successUrl = ""
	) => {
		loadingMessage("Registering...", 0);
		return businessRegisterAxios(registerInfo)
			.then(() => {
				successMessage("Registration successfully!").then(() =>
					forward
						? forwardUrl(fowardAction, "", continueUrl, successUrl)
						: Promise.resolve()
				);
			})
			.catch((e) => errorMessage(e));
	};

	return {
		thainowRegister,
		businessRegister,
	};
}

export default useRegister;
