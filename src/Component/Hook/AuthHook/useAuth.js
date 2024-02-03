// import { errorMessage } from "../../../RefComponent/Hook/useMessage";
import jwt_decode from "jwt-decode";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { signinAxios, signupAxios } from "../../../Axios/authaxios";
import {
	ACCESS_TOKEN_PROP,
	ACCOUNT_OBJ,
	CHANNEL_PROP,
	EMAIL_PROP,
	PROFILE_OBJ,
	REDIRECT_URI,
	SIGNIN_CHANNEL_THAINOW,
	SIGN_IN_PATH,
	THAINOW_USER_OBJ,
	USERNAME_PROP,
} from "../../../Util/ConstVar";
import useMessage from "../MessageHook/useMessage";
import useRedux from "../ReduxHook/useRedux";

function useAuth() {
	const { t } = useTranslation();
	const { successMessage, errorMessage } = useMessage();
	const { patchProfileInfo, patchAccountInfo } = useRedux();

	const navigate = useNavigate();
	const [params] = useSearchParams();
	const redirectUri = params.get(REDIRECT_URI) || "";
	const { pathname } = useLocation();

	const signout = () => {
		localStorage.removeItem(THAINOW_USER_OBJ);
		localStorage.removeItem(PROFILE_OBJ);
		localStorage.removeItem(ACCOUNT_OBJ);
		patchProfileInfo({}, true);
		patchAccountInfo({}, true);
		navigate("/");
	};

	const validateToken = () => {
		const access_token =
			JSON.parse(localStorage.getItem(THAINOW_USER_OBJ) || "{}")
				?.access_token || "";

		if (access_token.length > 0) {
			try {
				if (jwt_decode(access_token).exp < Date.now() / 1000) {
					// token is expired
					signout();
					return Promise.reject();
				} else {
					// token is still active
					return Promise.resolve();
				}
			} catch (e) {
				return Promise.reject();
			}
		}

		return Promise.reject();
	};

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
		patchProfileInfo(profile, true);
	};

	const saveAccountInfo = (account = {}) => {
		localStorage.setItem(ACCOUNT_OBJ, JSON.stringify(account));
		patchAccountInfo(account, true);
	};

	/**
	 *
	 * @param {*} provider SIGNIN_CHANNEL_THAINOW, GOOGLE, APPLE, etc.
	 * @param {*} credentials {CHANNEL_PROP, EMAIL_PROP, PHONE_PROP, REGION_PROP,PASSWORD_PROP, ...credentials}
	 * @param {*} forward
	 * @returns
	 */
	const signin = async (provider = "", credentials = {}, forward = true) => {
		return signinAxios(provider, credentials)
			.then((res) => {
				// save token
				saveToken(res.access_token);

				// save profile
				saveProfileInfo({
					...res.profile,
					authorities: [...res.account.authorities],
				});

				// save account
				saveAccountInfo(res.account);

				successMessage(
					`${t("signin_msg_as", {
						value: res.profile[`${USERNAME_PROP}`],
					})}`,
					2
				).then(() => {
					console.log("message");
					return forward ? navigate(`/${redirectUri}`) : Promise.resolve();
					// return forward
					// 	? findProfilesAxios().then((res = []) => {
					// 			res?.length > 1
					// 				? navigate(`${SWITCH_PROFILE_PATH}/${redirectUri}`)
					// 				: navigate(`/${redirectUri}`);
					// 	  })
					// 	: Promise.resolve();
				});
			})
			.catch((e) => errorMessage(e).then(() => Promise.reject()));
	};

	const auth = async (
		throwError = true,
		forward = true,
		customRedirectUri = ""
	) => {
		const profile = localStorage.getItem(PROFILE_OBJ);

		const isValidCredential = await validateToken()
			.then(() => (profile === "" ? false : true))
			.catch(() => false);

		if (isValidCredential)
			return forward
				? navigate(`/${redirectUri || customRedirectUri}`)
				: Promise.resolve();

		return throwError
			? errorMessage("message_invalid_sign_in_msg").then(() =>
					pathname === SIGN_IN_PATH
						? Promise.reject()
						: navigate(
								`${SIGN_IN_PATH}?${REDIRECT_URI}=${
									redirectUri || customRedirectUri
								}`
						  )
			  )
			: Promise.reject();
	};

	/**
	 *
	 * @param {*} payload  {CHANNEL_PROP, ...payload}
	 * @param {*} forward
	 * @returns
	 */
	const signup = async (
		channel = EMAIL_PROP,
		credentials = {},
		forward = true
	) => {
		return signupAxios(channel, credentials)
			.then(() =>
				successMessage("message_sign_up_success_msg").then(() =>
					signin(
						SIGNIN_CHANNEL_THAINOW,
						{ [`${CHANNEL_PROP}`]: channel, ...credentials },
						forward
					)
				)
			)
			.catch((e) => errorMessage(e).then(() => Promise.reject()));
	};

	return {
		auth,
		validateToken,
		signin,
		signout,
		signup,
	};
}

export default useAuth;
