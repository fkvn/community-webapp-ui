import { findPostAxios } from "../../Axios/axiosPromise";
import { FORWARD_CLOSE } from "../../Util/ConstVar";
import { errorMessage, loadingMessage, successMessage } from "./useMessage";
import useUrls from "./useUrls";

function usePost() {
	const { forwardUrl } = useUrls();

	const findPost = async (id = null, ownerId = null, type = "") => {
		loadingMessage("Loading ...", 0);

		return findPostAxios(id, ownerId, type)
			.then((res = {}) =>
				successMessage(`done`, 1, { className: "d-none" }).then(() =>
					Promise.resolve(res)
				)
			)
			.catch((e) => errorMessage(e).catch(() => forwardUrl(FORWARD_CLOSE)));
	};

	return {
		findPost,
	};
}

export default usePost;
