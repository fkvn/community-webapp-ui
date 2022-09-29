import {
	businessRegisterPromise,
	registerPromise,
} from "../../Axios/axiosPromise";
import { errorMessage, loadingMessage, successMessage } from "./useMessage";
import useUrls from "./useUrls";

function useRegister() {
	const { forwardUrl } = useUrls();

	const thainowRegister = async (
		registerInfo = {},
		forward = false,
		returnUrl = "",
		continueUrl = ""
	) => {
		loadingMessage("Registering...", 0);
		return registerPromise(registerInfo)
			.then(() => {
				successMessage("Registration successfully!").then(() =>
					forward ? forwardUrl(returnUrl, continueUrl) : Promise.resolve()
				);
			})
			.catch((e) => errorMessage(e));
	};

	const businessRegister = async (
		registerInfo = {},
		forward = false,
		returnUrl = "",
		continueUrl = ""
	) => {
		loadingMessage("Registering...", 0);
		return businessRegisterPromise(registerInfo)
			.then(() => {
				successMessage("Registration successfully!").then(() =>
					forward ? forwardUrl(returnUrl, continueUrl) : Promise.resolve()
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
