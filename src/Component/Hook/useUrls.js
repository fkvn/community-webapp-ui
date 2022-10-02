import { useLocation, useNavigate } from "react-router-dom";
import { CLOSE_URL, CONTINUE_URL, SUCCESS_URL } from "../../Util/ConstVar";

function useUrls() {
	const navigate = useNavigate();
	const location = useLocation();

	const forwardUrl = (closeUrl = "/", continueUrl = "/", successUrl = "/") => {
		if (closeUrl.length === 0) {
			closeUrl = location?.state?.[`${CLOSE_URL}`] || "/";
		}

		if (continueUrl.length === 0) {
			continueUrl = location?.state?.[`${CONTINUE_URL}`] || "/";
		}

		if (successUrl.length === 0) {
			successUrl = location?.state?.[`${SUCCESS_URL}`] || "/";
		}

		console.log(continueUrl);
		console.log(closeUrl);
		console.log(successUrl);

		const [next, state] =
			continueUrl.length > 1
				? [
						continueUrl,
						{
							[`${CLOSE_URL}`]: closeUrl,
							[`${SUCCESS_URL}`]: successUrl,
						},
				  ]
				: successUrl.length > 1
				? [successUrl, {}]
				: [closeUrl, {}];

		console.log(location);

		console.log(next);

		navigate(next, {
			state: {
				...state,
			},
		});
	};

	return { forwardUrl };
}

export default useUrls;
