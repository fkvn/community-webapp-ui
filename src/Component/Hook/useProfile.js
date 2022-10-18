import {
	removeAccountProfileAxios,
	removeBusinessProfileAxios,
} from "../../Axios/axiosPromise";
import { patchProfileInfoPromise } from "../../redux-store/dispatchPromise";
import {
	FORWARD_SUCCESS,
	ID_PROP,
	PROFILE_NAME_PROP,
	PROFILE_OBJ,
} from "../../Util/ConstVar";
import { signoutUserPromise } from "../../Util/Util";
import { errorMessage, successMessage } from "./useMessage";
import useUrls from "./useUrls";

function useProfile() {
	const { forwardUrl } = useUrls();

	const switchProfile = (
		profile = {},
		forward = false,
		fowardAction = FORWARD_SUCCESS,
		continueUrl = "",
		successUrl = ""
	) =>
		patchProfileInfoPromise({ ...profile }, true)
			.then(async () =>
				localStorage.setItem(PROFILE_OBJ, JSON.stringify(profile))
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
		profile = {},
		forward = false,
		fowardAction = FORWARD_SUCCESS,
		continueUrl = "",
		successUrl = ""
	) =>
		removeBusinessProfileAxios(profile?.[`${ID_PROP}`])
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

	const removeAccountProfile = (profile = {}) =>
		removeAccountProfileAxios(profile?.[`${ID_PROP}`])
			.then(() =>
				successMessage(
					<span>
						Successfully removed profile{" "}
						<strong>{profile?.info?.[`${PROFILE_NAME_PROP}`]}</strong>
					</span>
				).then(() =>
					signoutUserPromise().then(() =>
						forwardUrl(FORWARD_SUCCESS, "", "", "/")
					)
				)
			)
			.catch((e) => errorMessage(e));

	return {
		switchProfile,
		removeBusinessProfile,
		removeAccountProfile,
	};
}

export default useProfile;
