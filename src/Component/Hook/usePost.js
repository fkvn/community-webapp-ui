import {
	createDealAxios,
	findPostAxios,
	patchDealAxios,
} from "../../Axios/axiosPromise";
import {
	FORWARD_CLOSE,
	FORWARD_SUCCESS,
	PROFILE_ID_PROP,
	SEARCH_DEAL,
	SEARCH_POST,
} from "../../Util/ConstVar";
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

	const createDeal = async (ownerId = null, info = {}) => {
		loadingMessage("Updating ...", 0);

		return createDealAxios({ [`${PROFILE_ID_PROP}`]: ownerId, ...info })
			.then((id = null) =>
				successMessage(`Service Created successfully`).then(() =>
					forwardUrl(
						FORWARD_SUCCESS,
						"",
						"",
						`/${SEARCH_POST}/${SEARCH_DEAL}/${id}`
					)
				)
			)
			.catch((e) => errorMessage(e).catch(() => forwardUrl(FORWARD_CLOSE)));
	};

	const updateDeal = async (id = null, ownerId = null, info = {}) => {
		loadingMessage("Updating ...", 0);

		console.log(id);
		console.log(ownerId);

		return patchDealAxios(id, { [`${PROFILE_ID_PROP}`]: ownerId, ...info })
			.then(() =>
				successMessage(`Updated successfully`).then(() => Promise.resolve())
			)
			.catch((e) => errorMessage(e).catch(() => forwardUrl(FORWARD_CLOSE)));
	};

	return {
		findPost,
		updateDeal,
		createDeal,
	};
}

export default usePost;
