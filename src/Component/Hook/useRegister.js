import { registerPromise } from "../../Axios/axiosPromise";
import { errorMessage } from "./useMessage";
import useUrls from "./useUrls";

function useRegister() {
	const { forwardUrl } = useUrls();

	const thainowRegister = (
		registerInfo = {},
		forward = false,
		returnUrl = "",
		continueUrl = ""
	) => {
		return registerPromise(registerInfo)
			.then(() =>
				forward ? forwardUrl(returnUrl, continueUrl) : Promise.resolve()
			)
			.catch((e) => errorMessage(e));
	};

	return {
		thainowRegister,
	};
}

export default useRegister;
