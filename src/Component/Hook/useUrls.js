import {useLocation, useNavigate} from "react-router-dom";
import {ON_RETURN_URL, ON_SUCCESS_URL} from "../../Util/ConstVar";

function useUrls() {
	const navigate = useNavigate();
	const location = useLocation();

	const forwardUrl = (returnUrl = "/", continueUrl = "/") => {

		if (returnUrl.length === 0) {
			returnUrl = location?.state?.[`${ON_RETURN_URL}`] || "/";
		}

		if (continueUrl.length === 0) {
			continueUrl = location?.state?.[`${ON_SUCCESS_URL}`] || "/";
		}

		navigate(returnUrl.length > 1 ? returnUrl : continueUrl, {
			state: {
				...(returnUrl.length > 1 && {
					[`${ON_SUCCESS_URL}`]: continueUrl,
				}),
			},
		});
	};

	return { forwardUrl };
}

export default useUrls;
