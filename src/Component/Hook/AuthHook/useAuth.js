// import { errorMessage } from "../../../RefComponent/Hook/useMessage";
import jwt_decode from "jwt-decode";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { signinAxios } from "../../../Axios/authAxios";
import { findProfilesAxios } from "../../../Axios/userAxios";
import {
	ACCESS_TOKEN_PROP,
	PROFILE_OBJ,
	REDIRECT_URI,
	SIGN_IN_PATH,
	SWITCH_PROFILE_PATH,
	THAINOW_USER_OBJ,
} from "../../../Util/constVar";
import { isObjectEmpty } from "../../../Util/util";
import useMessage from "../MessageHook/useMessage";
import useRedux from "../useRedux";

function useAuth() {
	const { t } = useTranslation();
	const { loadingMessage, successMessage, errorMessage } = useMessage();

	const { profile, patchProfileInfo } = useRedux();

	const navigate = useNavigate();
	const [params] = useSearchParams();
	const redirectUri = params.get(REDIRECT_URI) || "";
	const { pathname } = useLocation();

	const signout = () => {
		localStorage.removeItem(THAINOW_USER_OBJ);
		localStorage.removeItem(PROFILE_OBJ);
		patchProfileInfo();
		navigate("/");
	};

	const validateToken = () => {
		const access_token =
			JSON.parse(localStorage.getItem(THAINOW_USER_OBJ))?.access_token || "";

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

	const signin = async (channel = "", credential = {}, forward = true) => {
		loadingMessage();

		return signinAxios(channel, credential)
			.then((res) => {
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

	const auth = async (
		throwError = true,
		forward = true,
		customRedirectUri = ""
	) => {
		const isValidCredential = await validateToken()
			.then(() => (isObjectEmpty(profile) ? false : true))
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

	return {
		auth,
		signin,
		signout,
		validateToken,
	};
}

export default useAuth;
