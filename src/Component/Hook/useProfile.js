import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";
import {
	findProfileDetailAxios,
	updateProfileAxios,
	uploadProfilePictureAxios,
} from "../../Axios/profileAxios";
import { changePasswordAxios } from "../../Axios/userAxios";
import { uploadFileAxios } from "../../Axios/utilAxios";
import {
	EMAIL_PROP,
	ID_PROP,
	PICTURE_PROP,
	PROFILE_OBJ,
	USERNAME_PROP,
} from "../../Util/constVar";
import useMessage from "./MessageHook/useMessage";
import useReduxCreator from "./ReduxHook/useReduxCreator";

function useProfile() {
	const { t } = useTranslation(["Password"]);
	const { patchProfileInfo } = useReduxCreator();
	const { successMessage, errorMessage } = useMessage();
	const { [`${PROFILE_OBJ}`]: profile = {} } =
		useSelector((state) => state.userReducer) || {};

	/**
	 *
	 * @param {*} credentials {ID_PROP: "", PASSWORD_PROP: ""}
	 */
	const changePassword = async (credentials = {}) => {
		return changePasswordAxios(credentials)
			.then(() => successMessage(t("password_change_success_msg")))
			.catch((e) => errorMessage(e).then(() => Promise.reject()));
	};

	const changeProfileAvatar = async (formData = new FormData()) => {
		return uploadFileAxios(formData)
			.then((res = {}) =>
				uploadProfilePictureAxios(profile?.id, res)
					.then((url = "") => {
						const storedProfile = {
							...(JSON.parse(localStorage.getItem(PROFILE_OBJ)) || {}),
						};
						const updatedProfile = {
							...storedProfile,
							[`${PICTURE_PROP}`]: url,
						};
						localStorage.setItem(PROFILE_OBJ, JSON.stringify(updatedProfile));

						return patchProfileInfo({ [`${PICTURE_PROP}`]: url }, false);
					})
					.catch((e) => errorMessage(e).then(() => Promise.reject()))
			)
			.catch((e) => errorMessage(e).then(() => Promise.reject()));
	};

	const findProfileDetail = async () => {
		return findProfileDetailAxios(profile[`${ID_PROP}`])
			.then(({ details, ...res }) => {
				const profileDetail = { ...details, ...res };

				// update credentials
				const storageProfile = {
					...JSON.parse(localStorage.getItem(PROFILE_OBJ) || "{}"),
					[`${EMAIL_PROP}`]: profileDetail[`${EMAIL_PROP}`],
					[`${USERNAME_PROP}`]: profileDetail[`${USERNAME_PROP}`],
				};
				localStorage.setItem(PROFILE_OBJ, JSON.stringify(storageProfile));

				patchProfileInfo(profileDetail);

				return Promise.resolve();
			})
			.catch((e) => errorMessage(e).then(() => Promise.reject()));
	};

	const updateProfile = async (updatedFields = {}) => {
		return updateProfileAxios(profile?.id, updatedFields)
			.then(() => {
				const profileDetail = { ...profile, ...updatedFields };

				// update credentials
				const storageProfile = {
					...JSON.parse(localStorage.getItem(PROFILE_OBJ) || "{}"),
					[`${EMAIL_PROP}`]: updatedFields?.[`${EMAIL_PROP}`],
					[`${USERNAME_PROP}`]: updatedFields?.[`${USERNAME_PROP}`],
				};
				localStorage.setItem(PROFILE_OBJ, JSON.stringify(storageProfile));

				// update redux
				patchProfileInfo(profileDetail);

				return successMessage("message_save_msg", 2, false);
			})
			.catch((e) => errorMessage(e).then(() => Promise.reject()));
	};

	// const switchProfile = (
	// 	profile = {},
	// 	forward = true,
	// 	fowardAction = FORWARD_SUCCESS,
	// 	continueUrl = "",
	// 	successUrl = ""
	// ) =>
	// 	patchProfileInfoPromise({ ...profile }, true)
	// 		.then(async () =>
	// 			localStorage.setItem(PROFILE_OBJ, JSON.stringify(profile))
	// 		)
	// 		.then(() =>
	// 			successMessage(
	// 				<span>
	// 					Switch Profile to{" "}
	// 					<strong>{profile?.info?.[`${PROFILE_NAME_PROP}`]}</strong>{" "}
	// 					successfully
	// 				</span>
	// 			).then(() =>
	// 				forward
	// 					? forwardUrl(fowardAction, "", continueUrl, successUrl)
	// 					: Promise.resolve()
	// 			)
	// 		)
	// 		.catch((e) => errorMessage(e));

	// const removeBusinessProfile = (
	// 	profile = {},
	// 	forward = false,
	// 	fowardAction = FORWARD_SUCCESS,
	// 	continueUrl = "",
	// 	successUrl = ""
	// ) =>
	// 	removeBusinessProfileAxios(profile?.[`${ID_PROP}`])
	// 		.then(() =>
	// 			successMessage(
	// 				<span>
	// 					Successfully removed profile{" "}
	// 					<strong>{profile?.info?.[`${PROFILE_NAME_PROP}`]}</strong>
	// 				</span>
	// 			).then(() =>
	// 				forward
	// 					? forwardUrl(fowardAction, "", continueUrl, successUrl)
	// 					: Promise.resolve()
	// 			)
	// 		)
	// 		.catch((e) => errorMessage(e));

	// const removeUserProfile = (profile = {}) =>
	// 	removeUserProfileAxios(profile?.[`${ID_PROP}`])
	// 		.then(() =>
	// 			successMessage(
	// 				<span>
	// 					Successfully removed profile{" "}
	// 					<strong>{profile?.info?.[`${PROFILE_NAME_PROP}`]}</strong>
	// 				</span>
	// 			).then(() =>
	// 				signoutUserPromise().then(() =>
	// 					forwardUrl(FORWARD_SUCCESS, "", "", "/")
	// 				)
	// 			)
	// 		)
	// 		.catch((e) => errorMessage(e));

	// const patchUserProfile = (id = -1, info = {}) =>
	// 	patchUserProfileAxios(id, info)
	// 		.then(() => successMessage(<span>Updated profile successfully!</span>))
	// 		.catch((e) => errorMessage(e));

	// const patchBusinessProfile = (id = -1, info = {}) =>
	// 	patchBusinessProfileAxios(id, info)
	// 		.then(() => successMessage(<span>Updated profile successfully!</span>))
	// 		.catch((e) => errorMessage(e));

	// const findProfile = async (id = -1) => {
	// 	loadingMessage("Loading ...", 0);

	// 	return findProfileAxios(id)
	// 		.then((res) =>
	// 			successMessage(`done`, 1, { className: "d-none" }).then(() =>
	// 				Promise.resolve(res)
	// 			)
	// 		)
	// 		.catch((e) => errorMessage(e));
	// };

	return {
		// switchProfile,
		// findProfile,
		// removeBusinessProfile,
		// removeAccountProfile: removeUserProfile,
		// uploadProfileAvatar,
		// patchUserProfile,
		// patchBusinessProfile,
		profile,
		findProfileDetail,
		updateProfile,
		changePassword,
		changeProfileAvatar,
	};
}

export default useProfile;
