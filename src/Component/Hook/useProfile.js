import { useTranslation } from "react-i18next";
import { changePasswordAxios } from "../../Axios/authAxios";
import useMessage from "./MessageHook/useMessage";
import useUrls from "./useUrls";

function useProfile() {
	const { forwardUrl } = useUrls();
	const { t } = useTranslation(["Password"]);
	const { loadingMessage, successMessage, errorMessage } = useMessage();

	// const uploadProfileAvatar = async (id = -1, formData = new FormData()) => {
	// 	loadingMessage("Uploading ...", 0);

	// 	return uploadFileAxios(formData).then((res = {}) =>
	// 		uploadProfileAvatarAxios(id, res).then((url = "") => {
	// 			const storedProfile = getState()?.[`${PROFILE_OBJ}`];
	// 			const updatedProfile = {
	// 				...storedProfile,
	// 				[`${INFO_PROP}`]: {
	// 					...storedProfile?.[`${INFO_PROP}`],
	// 					[`${PICTURE_PROP}`]: url,
	// 				},
	// 			};

	// 			return patchProfileInfoPromise(updatedProfile, true)
	// 				.then(async () =>
	// 					localStorage.setItem(PROFILE_OBJ, JSON.stringify(updatedProfile))
	// 				)
	// 				.then(() =>
	// 					successMessage("Uploaded successfully").then(() =>
	// 						Promise.resolve(url)
	// 					)
	// 				);
	// 		})
	// 	);
	// };

	const changePassword = async (credentials = {}) => {
		loadingMessage();
		return changePasswordAxios(credentials)
			.then(() => successMessage(t("password_change_success_msg")))
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
		changePassword,
	};
}

export default useProfile;
