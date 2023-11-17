import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signinAxios } from "../../Axios/authAxios";
import { findProfilesAxios } from "../../Axios/userAxios";
import store from "../../ReduxStore/Store";
import { patchProfileInfoActionCreator } from "../../ReduxStore/UserReducer/UserActionCreator";
import {
	ACCESS_TOKEN_PROP,
	PROFILE_OBJ,
	REDIRECT_URI,
	SWITCH_PROFILE_PATH,
	THAINOW_USER_OBJ,
} from "../../Util/ConstVar";
import useMessage from "./MessageHook/useMessage";

function useSignin() {
	const navigate = useNavigate();
	const { loadingMessage, successMessage, errorMessage } = useMessage();
	const { t } = useTranslation();
	const [params] = useSearchParams();
	const redirectUri = params.get(REDIRECT_URI) || "";

	const saveToken = (access_token = "") => {
		// save token to storage
		localStorage.setItem(
			THAINOW_USER_OBJ,
			JSON.stringify({
				[`${ACCESS_TOKEN_PROP}`]: access_token,
			})
		);
	};

	const saveProfileInfo = (profile = {}) => {
		localStorage.setItem(PROFILE_OBJ, JSON.stringify(profile));
		store.dispatch(patchProfileInfoActionCreator(profile, true));
	};

	/**
	 *
	 * @param {*} channel
	 * @param {*} credential
	 * @param {*} forward
	 * @param {*} fowardAction
	 * @param {*} continueUrl
	 * @param {*} successUrl
	 * @returns
	 */
	const onSigninHandle = async (
		channel = "",
		credential = {},
		forward = true
	) => {
		loadingMessage();

		return signinAxios(channel, credential)
			.then((res) => {
				console.log(res);
				// save token
				saveToken(res.access_token);

				// save profile
				saveProfileInfo(res.profile);

				successMessage(
					`${t("signin_msg_as", {
						value: res.profile.info.email,
					})}`,
					2
				).then(() =>
					forward
						? findProfilesAxios().then((res = []) => {
								res?.length > 1
									? navigate(`${SWITCH_PROFILE_PATH}/${redirectUri}`)
									: navigate(`/${redirectUri}`);
						  })
						: Promise.resolve()
				);
			})
			.catch((e) => errorMessage(e).then(() => Promise.reject()));
	};

	/* return sample :
			Promise.resolve({
			access_token:
				"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4YjQ3YTI0Yy1kNjc3LTQ5YmMtOGU3Ni1iYTUzNDM4MmE2OWUiLCJpYXQiOjE2NjQyMjA1NjAsImV4cCI6MTY2NDIyMDYyMH0.xQiu0TPv7k18LMnsBL2RX9nyS6Im8FFVhYTWJ7GbOzzOdEkR4tpV6GkJQD7fxz2Ao9S7sieNqjdbSqVpSBoRzw",

			profile: {
				id: 1331,
				info: {
					picture: 'https://firebasestorage.googleapis.com/v0/b/mono-thainow.appspot.com/o/thainow-service-worker%2F0817531b-7c27-4a11-ae0a-c56b3d99abfd.png?alt=media',
					createdOn: '2022-09-26 12:26:56',
					name: '(626) 877-3222'
				},
				avgRating: 0,
				totalReview: 0,
				type: 'USER_PROFILE'
			},
		})
	
	*/
	// const thainowSignin = async (
	// 	channel = "",
	// 	value = "",
	// 	password = "",
	// 	forward = false,
	// 	fowardAction = FORWARD_CONTINUE,
	// 	continueUrl = "/switch-profiles",
	// 	successUrl = ""
	// ) => {
	// 	loadingMessage("Signing in ...", 0);

	// 	return signinViaThaiNowAxios(channel, value, password)
	// 		.then((res) => {
	// 			// save user
	// 			saveUserInfo({
	// 				access_token: res.access_token,
	// 			});

	// 			// save profile
	// 			saveProfileInfo(res.profile);

	// 			successMessage("Signing in successfully").then(() =>
	// 				forward
	// 					? findProfilesAxios().then((res = []) => {
	// 							res?.length > 1
	// 								? forwardUrl(
	// 										FORWARD_CONTINUE,
	// 										"",
	// 										"/switch-profiles",
	// 										successUrl
	// 								  )
	// 								: forwardUrl(fowardAction, "", continueUrl, successUrl);
	// 					  })
	// 					: Promise.resolve()
	// 			);

	// 			// if (forward) {
	// 			// 	;
	// 			// } else return Promise.resolve();
	// 		})
	// 		.catch((e) => errorMessage(e));
	// };

	// const googleSignin = async (
	// 	credential = {},
	// 	forward = false,
	// 	fowardAction = FORWARD_SUCCESS,
	// 	continueUrl = "",
	// 	successUrl = ""
	// ) =>
	// 	// accessWithGooglePromise(credential)
	// 	signinAxios(SIGNIN_CHANNEL_GOOGLE, credential)
	// 		.then((res) => {
	// 			// save user
	// 			saveUserInfo({
	// 				access_token: res.access_token,
	// 			});

	// 			// save profile
	// 			saveProfileInfo(res.profile);

	// 			successMessage("Signing in successfully", 1).then(() =>
	// 				forward
	// 					? findProfilesAxios().then((res = []) => {
	// 							res?.length > 1
	// 								? forwardUrl(
	// 										FORWARD_CONTINUE,
	// 										"",
	// 										"/switch-profiles",
	// 										successUrl
	// 								  )
	// 								: forwardUrl(fowardAction, "", continueUrl, successUrl);
	// 					  })
	// 					: Promise.resolve()
	// 			);
	// 		})
	// 		.catch((e) => errorMessage(e));

	// const appleSignin = async (
	// 	credential = {},
	// 	forward = false,
	// 	fowardAction = FORWARD_SUCCESS,
	// 	continueUrl = "/",
	// 	successUrl = ""
	// ) =>
	// 	accessWithAppleAxios(credential)
	// 		.then((res) => {
	// 			// save user
	// 			saveUserInfo({
	// 				access_token: res.access_token,
	// 			});

	// 			// save profile
	// 			saveProfileInfo(res.profile);

	// 			successMessage("Signing in successfully", 1).then(() =>
	// 				forward
	// 					? findProfilesAxios().then((res = []) => {
	// 							res?.length > 1
	// 								? forwardUrl(
	// 										FORWARD_CONTINUE,
	// 										"",
	// 										"/switch-profiles",
	// 										successUrl
	// 								  )
	// 								: forwardUrl(fowardAction, "", continueUrl, successUrl);
	// 					  })
	// 					: Promise.resolve()
	// 			);
	// 		})
	// 		.catch((e) => errorMessage(e));

	// const facebookSignin = async (
	// 	credential = {},
	// 	forward = false,
	// 	fowardAction = FORWARD_SUCCESS,
	// 	continueUrl = "/",
	// 	successUrl = ""
	// ) =>
	// 	accessWithAppleAxios(credential)
	// 		.then((res) => {
	// 			// save user
	// 			saveUserInfo({
	// 				access_token: res.access_token,
	// 			});

	// 			// save profile
	// 			saveProfileInfo(res.profile);

	// 			successMessage("Signing in successfully", 1).then(() =>
	// 				forward
	// 					? findProfilesAxios().then((res = []) => {
	// 							res?.length > 1
	// 								? forwardUrl(
	// 										FORWARD_CONTINUE,
	// 										"",
	// 										"/switch-profiles",
	// 										successUrl
	// 								  )
	// 								: forwardUrl(fowardAction, "", continueUrl, successUrl);
	// 					  })
	// 					: Promise.resolve()
	// 			);
	// 		})
	// 		.catch((e) => errorMessage(e));

	return {
		// thainowSignin,
		// googleSignin,
		// appleSignin,
		onSigninHandle,
	};
}

export default useSignin;
