import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { signinAxios } from "../../Axios/authAxios";
import { findProfilesAxios } from "../../Axios/userAxios";
import {
	CLOSE_URL,
	FORWARD_CONTINUE,
	FORWARD_SUCCESS,
	ID_PROP,
	PROFILE_OBJ,
	SEARCH_PROFILE,
	SUCCESS_URL,
} from "../../Util/ConstVar";
import {
	getCurrentUrl,
	isObjectEmpty,
	saveProfileInfo,
	saveUserInfo,
} from "../../Util/Util";
import { thainowReducer } from "../../redux-store/reducer/thainowReducer";
import useMessage from "./MessageHook/useMessage";
import useUrls from "./useUrls";

function useSignin() {
	const { forwardUrl } = useUrls();
	const navigate = useNavigate();
	const location = useLocation();
	const { [`${PROFILE_OBJ}`]: profile = {} } = useSelector(thainowReducer);
	const { loadingMessage, successMessage, errorMessage } = useMessage();
	const { t } = useTranslation();

	const onClickSigninHandle = () =>
		isObjectEmpty(profile)
			? navigate("/signin", {
					state: {
						[`${CLOSE_URL}`]: getCurrentUrl(location),
						[`${SUCCESS_URL}`]: getCurrentUrl(location),
					},
			  })
			: navigate(`/${SEARCH_PROFILE}/${profile?.[`${ID_PROP}`]}`, {
					state: {
						[`${CLOSE_URL}`]: getCurrentUrl(location),
					},
			  });

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
		forward = false,
		fowardAction = FORWARD_SUCCESS,
		continueUrl = "",
		successUrl = ""
	) => {
		loadingMessage();

		return signinAxios(channel, credential)
			.then((res) => {
				// save user
				saveUserInfo({
					access_token: res.access_token,
				});

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
									? forwardUrl(
											FORWARD_CONTINUE,
											"",
											"/switch-profiles",
											successUrl
									  )
									: forwardUrl(fowardAction, "", continueUrl, successUrl);
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
		onClickSigninHandle,
	};
}

export default useSignin;
