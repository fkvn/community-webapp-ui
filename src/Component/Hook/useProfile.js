import { useSelector } from "react-redux";
import {
	findProfilesAxios,
	removeBusinessProfileAxios,
} from "../../Axios/axiosPromise";
import { patchProfileInfoPromise } from "../../redux-store/dispatchPromise";
import { PROFILE_NAME_PROP, THAINOW_PROFILE_OBJ } from "../../Util/ConstVar";
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
		closeUrl = "",
		continueUrl = "",
		succesUrl = ""
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
						? forwardUrl(closeUrl, continueUrl, succesUrl)
						: Promise.resolve()
				)
			)
			.catch((e) => errorMessage(e));

	const removeBusinessProfile = (
		id = -1,
		forward = false,
		closeUrl = "",
		continueUrl = "",
		succesUrl = ""
	) =>
		removeBusinessProfileAxios(id)
			.then(() =>
				findProfilesAxios()
					.then((profiles = []) =>
						patchProfileInfoPromise(profiles[0], true)
							.then(async () =>
								localStorage.setItem(
									THAINOW_PROFILE_OBJ,
									JSON.stringify(profiles[0])
								)
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
										? forwardUrl(closeUrl, continueUrl, succesUrl)
										: Promise.resolve()
								)
							)
					)
					.catch((e) => errorMessage(e))
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
