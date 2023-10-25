import { useLocation, useNavigate } from "react-router-dom";
import {
	CLOSE_URL,
	CONTINUE_URL,
	FORWARD_CLOSE,
	FORWARD_CONTINUE,
	FORWARD_SUCCESS,
	SEARCH_PROFILE,
	SUCCESS_URL,
} from "../../Util/ConstVar";

function useUrls() {
	const navigate = useNavigate();
	const location = useLocation();

	const { pathname } = location;

	const forwardUrl = (
		action = "",
		closeUrl = "",
		continueUrl = "",
		successUrl = ""
	) => {
		if (closeUrl.length === 0) {
			closeUrl =
				location?.state?.[`${CLOSE_URL}`] ||
				(pathname.includes(SEARCH_PROFILE) ? `/search` : "/");
		}

		if (continueUrl.length === 0) {
			continueUrl = location?.state?.[`${CONTINUE_URL}`] || "/";
		}

		if (successUrl.length === 0) {
			successUrl = location?.state?.[`${SUCCESS_URL}`] || "/";
		}

		const [next, state] =
			action === FORWARD_CONTINUE
				? [
						continueUrl,
						{
							[`${CLOSE_URL}`]: closeUrl,
							[`${SUCCESS_URL}`]: successUrl,
						},
				  ]
				: action === FORWARD_CLOSE
				? [closeUrl, {}]
				: action === FORWARD_SUCCESS
				? [successUrl, { [`${CLOSE_URL}`]: closeUrl }]
				: ["/", {}];

		navigate(next, {
			state: {
				...state,
			},
		});
	};

	return { forwardUrl };
}

export default useUrls;
