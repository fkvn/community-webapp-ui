import { THAINOW_USER_OBJ } from "../../Util/ConstVar";
import { validateToken } from "../../Util/Util";
import { errorMessage } from "./useMessage";

function useAuth() {
	const auth = async (throwError = true) => {
		const access_token =
			JSON.parse(localStorage.getItem(THAINOW_USER_OBJ))?.access_token || "";
		return validateToken(access_token).catch(() =>
			throwError
				? errorMessage(
						"Your credentials are incorrect or have expired ... Please sign in again!"
				  )
				: Promise.reject()
		);
	};

	return {
		auth,
	};
}

export default useAuth;
