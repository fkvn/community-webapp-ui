import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signinAxios } from "../../Axios/authAxios";
import { findProfilesAxios } from "../../Axios/userAxios";
import {
	ACCESS_TOKEN_PROP,
	PROFILE_OBJ,
	REDIRECT_URI,
	SWITCH_PROFILE_PATH,
	THAINOW_USER_OBJ,
} from "../../Util/ConstVar";
import useMessage from "./MessageHook/useMessage";
import useRedux from "./useRedux";

function useSignin() {
	const navigate = useNavigate();
	const { loadingMessage, successMessage, errorMessage } = useMessage();
	const { t } = useTranslation();
	const [params] = useSearchParams();
	const redirectUri = params.get(REDIRECT_URI) || "";
	const { patchProfileInfo } = useRedux();

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

	return {
		onSigninHandle,
	};
}

export default useSignin;
