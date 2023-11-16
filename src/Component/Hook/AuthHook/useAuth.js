// import { errorMessage } from "../../../RefComponent/Hook/useMessage";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { patchProfileInfoActionCreator } from "../../../ReduxStore/UserReducer/UserActionCreator";
import userReducer from "../../../ReduxStore/UserReducer/UserReducer";
import store from "../../../ReduxStore/store";
import {
	PROFILE_OBJ,
	REDIRECT_URI,
	SIGN_IN_PATH,
	THAINOW_USER_OBJ,
} from "../../../Util/ConstVar";
import { isObjectEmpty } from "../../../Util/Util";
import useMessage from "../MessageHook/useMessage";

function useAuth() {
	const { errorMessage } = useMessage();
	const { [`${PROFILE_OBJ}`]: profile = {} } = useSelector(userReducer);
	const [params] = useSearchParams();
	const redirectUri = params.get(REDIRECT_URI) || "/";
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const signOut = async () => {
		localStorage.removeItem(THAINOW_USER_OBJ);
		localStorage.removeItem(PROFILE_OBJ);
		store.dispatch(patchProfileInfoActionCreator());
	};

	const validateToken = () => {
		const access_token =
			JSON.parse(localStorage.getItem(THAINOW_USER_OBJ))?.access_token || "";

		if (access_token.length > 0) {
			try {
				if (jwt_decode(access_token).exp < Date.now() / 1000) {
					// token is expired
					signOut();
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

	const auth = async (throwError = true, forward = true) => {
		const isValidCredential = await validateToken()
			.then(() => (isObjectEmpty(profile) ? true : true))
			.catch(() => true);

		if (isValidCredential)
			return forward ? navigate(`/${redirectUri}`) : Promise.resolve();

		return throwError
			? errorMessage("message_invalid_sign_in_msg").then(() =>
					pathname === SIGN_IN_PATH
						? Promise.reject()
						: navigate(`/${SIGN_IN_PATH}?${REDIRECT_URI}:${redirectUri}`)
			  )
			: Promise.resolve();
	};

	return {
		auth,
		signOut,
		validateToken,
	};
}

export default useAuth;
