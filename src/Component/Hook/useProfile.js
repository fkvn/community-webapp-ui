import { useSelector } from "react-redux";
import { removeBusinessProfileAxios } from "../../Axios/axiosPromise";
import { patchProfileInfoPromise } from "../../redux-store/dispatchPromise";
import {
	FORWARD_SUCCESS,
	PROFILE_NAME_PROP,
	THAINOW_PROFILE_OBJ,
} from "../../Util/ConstVar";
import { isObjectEmpty } from "../../Util/Util";
import { errorMessage, successMessage } from "./useMessage";
import useUrls from "./useUrls";

function useProfile(init = true) {
	const storedProfile =
		JSON.parse(localStorage.getItem(THAINOW_PROFILE_OBJ)) || {};

	/* proifle format {
		id: 1,
		info: {
			picture: "url",
			name: "",
			picture: ""
		}
		avgRating: 0,
		totalReview: 0,
		type= "USER_PROFILE"
	} */
	const profile = useSelector(
		(state) => state.thainowReducer[`${THAINOW_PROFILE_OBJ}`] || {}
	);

	const { forwardUrl } = useUrls();

	const initProfile = () => {
		if (isObjectEmpty(profile) && !isObjectEmpty(storedProfile)) {
			patchProfileInfoPromise(storedProfile);
		}
	};

	const switchProfile = (
		profile = {},
		forward = false,
		fowardAction = FORWARD_SUCCESS,
		continueUrl = "",
		successUrl = ""
	) =>
		patchProfileInfoPromise({ ...profile }, true)
			.then(async () =>
				localStorage.setItem(THAINOW_PROFILE_OBJ, JSON.stringify(profile))
			)
			.then(() =>
				successMessage(
					<span>
						Switch Profile to{" "}
						<strong>{profile?.info?.[`${PROFILE_NAME_PROP}`]}</strong>{" "}
						successfully
					</span>
				).then(() =>
					forward
						? forwardUrl(fowardAction, "", continueUrl, successUrl)
						: Promise.resolve()
				)
			)
			.catch((e) => errorMessage(e));

	const removeBusinessProfile = (
		id = -1,
		forward = false,
		fowardAction = FORWARD_SUCCESS,
		continueUrl = "",
		successUrl = ""
	) =>
		removeBusinessProfileAxios(id)
			.then(() =>
				successMessage(
					<span>
						Successfully removed profile{" "}
						<strong>{profile?.info?.[`${PROFILE_NAME_PROP}`]}</strong>
					</span>
				).then(() =>
					forward
						? forwardUrl(fowardAction, "", continueUrl, successUrl)
						: Promise.resolve()
				)
			)
			.catch((e) => errorMessage(e));

	if (init) {
		initProfile();
	}

	return {
		profile,
		initProfile,
		switchProfile,
		removeBusinessProfile,
	};
}

export default useProfile;
