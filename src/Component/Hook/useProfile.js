import { useTranslation } from "react-i18next";

import {
	findProfileDetailAxios,
	patchProfileAxios,
	uploadAvatarAxios,
} from "../../Axios/profileAxios";
import { changePasswordAxios } from "../../Axios/userAxios";
import { uploadFileAxios } from "../../Axios/utilAxios";
import {
	EMAIL_PROP,
	PROFILE_AVATAR_PROP,
	PROFILE_OBJ,
	USERNAME_PROP,
} from "../../Util/ConstVar";
import useMessage from "./MessageHook/useMessage";
import useRedux from "./ReduxHook/useRedux";

function useProfile() {
	const { t } = useTranslation(["Password"]);
	const { patchProfileInfo } = useRedux();
	const { successMessage, errorMessage } = useMessage();

	/**
	 *
	 * @param {*} credentials {CURRENT_PASSWORD_PROP: "", PASSWORD_PROP: ""}
	 */
	const changePassword = async (
		accountId,
		credentials = {},
		isVerify = false
	) => {
		return changePasswordAxios(accountId, credentials, isVerify)
			.then(() => successMessage(t("password_change_success_msg")))
			.catch((e) => errorMessage(e).then(() => Promise.reject()));
	};

	const changeProfileAvatar = async (id = -1, formData = new FormData()) => {
		return uploadFileAxios(formData)
			.then((url = "") =>
				uploadAvatarAxios(id, url)
					.then(() => {
						const storedProfile = {
							...(JSON.parse(localStorage.getItem(PROFILE_OBJ)) || {}),
						};
						const updatedProfile = {
							...storedProfile,
							[`${PROFILE_AVATAR_PROP}`]: url,
						};
						localStorage.setItem(PROFILE_OBJ, JSON.stringify(updatedProfile));

						return patchProfileInfo({ [`${PROFILE_AVATAR_PROP}`]: url }, false);
					})
					.catch((e) => errorMessage(e).then(() => Promise.reject()))
			)
			.catch((e) => errorMessage(e).then(() => Promise.reject()));
	};

	const findProfileDetail = async (id = -1) => {
		return findProfileDetailAxios(id)
			.then(({ details, ...res }) => {
				const profileDetail = { ...details, ...res };

				// update credentials
				const storageProfile = {
					...JSON.parse(localStorage.getItem(PROFILE_OBJ) || "{}"),
					[`${EMAIL_PROP}`]: profileDetail[`${EMAIL_PROP}`],
					[`${USERNAME_PROP}`]: profileDetail[`${USERNAME_PROP}`],
				};
				localStorage.setItem(PROFILE_OBJ, JSON.stringify(storageProfile));

				patchProfileInfo({
					...storageProfile,
					...profileDetail,
				});

				return Promise.resolve();
			})
			.catch((e) => errorMessage(e).then(() => Promise.reject()));
	};

	const updateProfile = async (id = -1, updatedFields = {}) => {
		return patchProfileAxios(id, updatedFields)
			.then(() => {
				// const profileDetail = { ...profile, ...updatedFields };

				// update credentials
				const storageProfile = {
					...JSON.parse(localStorage.getItem(PROFILE_OBJ) || "{}"),
					[`${EMAIL_PROP}`]: updatedFields?.[`${EMAIL_PROP}`],
					[`${USERNAME_PROP}`]: updatedFields?.[`${USERNAME_PROP}`],
				};
				localStorage.setItem(PROFILE_OBJ, JSON.stringify(storageProfile));

				// update redux
				patchProfileInfo(updatedFields, false);

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
		findProfileDetail,
		updateProfile,
		changePassword,
		changeProfileAvatar,
	};
}

export default useProfile;
