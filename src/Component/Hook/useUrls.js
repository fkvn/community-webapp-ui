import { useLocation, useNavigate } from "react-router-dom";
import { ON_RETURN_URL, ON_SUCCESS_URL } from "../../Util/ConstVar";

function useUrls() {
	const navigate = useNavigate();
	const location = useLocation();

	const forwardUrl = (returnUrl = "/", continueUrl = "/", successUrl = "/") => {
		if (returnUrl.length === 0) {
			returnUrl = location?.state?.[`${ON_RETURN_URL}`] || "/";
		}

		if (successUrl.length === 0) {
			successUrl = location?.state?.[`${ON_SUCCESS_URL}`] || "/";
		}

		navigate(continueUrl.length > 1 ? continueUrl : returnUrl, {
			state: {
				...(continueUrl.length > 1 && {
					[`${ON_RETURN_URL}`]: returnUrl,
					[`${ON_SUCCESS_URL}`]: successUrl,
				}),
			},
		});
	};

	return { forwardUrl };
}

export default useUrls;
