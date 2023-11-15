import { validateToken } from "../../Util/Util";
import { errorMessage } from "./useMessage";

function useAuth() {
	const auth = async (throwError = true) =>
		validateToken().catch(() =>
			throwError
				? errorMessage(
						"Your credentials are incorrect or have expired ... Please sign in again!"
				  )
				: Promise.reject()
		);

	return {
		auth,
	};
}

export default useAuth;
