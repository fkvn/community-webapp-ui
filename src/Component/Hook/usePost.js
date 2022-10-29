import {
	createDealAxios,
	createHousingAxios,
	createJobAxios,
	findServiceAxios,
	patchDealAxios,
	patchHousingAxios,
	patchJobAxios,
} from "../../Axios/axiosPromise";
import {
	FORWARD_CLOSE,
	FORWARD_SUCCESS,
	PROFILE_ID_PROP,
	SEARCH_DEAL,
	SEARCH_HOUSING,
	SEARCH_JOB,
	SEARCH_SERVICE,
} from "../../Util/ConstVar";
import { errorMessage, loadingMessage, successMessage } from "./useMessage";
import useUrls from "./useUrls";

function usePost() {
	const { forwardUrl } = useUrls();

	const findService = async (id = null, ownerId = null, type = "") => {
		loadingMessage("Loading ...", 0);

		return findServiceAxios(id, ownerId, type)
			.then((res = {}) =>
				successMessage(`done`, 1, { className: "d-none" }).then(() =>
					Promise.resolve(res)
				)
			)
			.catch((e) => errorMessage(e).catch(() => forwardUrl(FORWARD_CLOSE)));
	};

	//  deal service

	const createDeal = async (ownerId = null, info = {}) => {
		loadingMessage("Creating service ...", 0);

		return createDealAxios({ [`${PROFILE_ID_PROP}`]: ownerId, ...info })
			.then((id = null) =>
				successMessage(`Service Created successfully`).then(() =>
					forwardUrl(
						FORWARD_SUCCESS,
						"",
						"",
						`/${SEARCH_SERVICE}/${SEARCH_DEAL}/${id}`
					)
				)
			)
			.catch((e) => errorMessage(e));
	};

	const updateDeal = async (id = null, ownerId = null, info = {}) => {
		loadingMessage("Updating service information...", 0);

		return patchDealAxios(id, { [`${PROFILE_ID_PROP}`]: ownerId, ...info })
			.then(() =>
				successMessage(`Updated service information successfully`).then(() =>
					Promise.resolve()
				)
			)
			.catch((e) => errorMessage(e));
	};

	// job service

	const createJob = async (ownerId = null, info = {}) => {
		loadingMessage("Creating service ...", 0);

		return createJobAxios({ [`${PROFILE_ID_PROP}`]: ownerId, ...info })
			.then((id = null) =>
				successMessage(`Service Created successfully`).then(() =>
					forwardUrl(
						FORWARD_SUCCESS,
						"",
						"",
						`/${SEARCH_SERVICE}/${SEARCH_JOB}/${id}`
					)
				)
			)
			.catch((e) => errorMessage(e));
	};

	const updateJob = async (id = null, ownerId = null, info = {}) => {
		loadingMessage("Updating service information...", 0);

		return patchJobAxios(id, { [`${PROFILE_ID_PROP}`]: ownerId, ...info })
			.then(() =>
				successMessage(`Updated service information successfully`).then(() =>
					Promise.resolve()
				)
			)
			.catch((e) => errorMessage(e));
	};

	// housing service

	const createHousing = async (ownerId = null, info = {}) => {
		loadingMessage("Creating service ...", 0);

		return createHousingAxios({ [`${PROFILE_ID_PROP}`]: ownerId, ...info })
			.then((id = null) =>
				successMessage(`Service Created successfully`).then(() =>
					forwardUrl(
						FORWARD_SUCCESS,
						"",
						"",
						`/${SEARCH_SERVICE}/${SEARCH_HOUSING}/${id}`
					)
				)
			)
			.catch((e) => errorMessage(e));
	};

	const updateHousing = async (id = null, ownerId = null, info = {}) => {
		loadingMessage("Updating service information...", 0);

		return patchHousingAxios(id, { [`${PROFILE_ID_PROP}`]: ownerId, ...info })
			.then(() =>
				successMessage(`Updated service information successfully`).then(() =>
					Promise.resolve()
				)
			)
			.catch((e) => errorMessage(e));
	};

	return {
		findService,
		updateDeal,
		createDeal,
		createJob,
		updateJob,
		createHousing,
		updateHousing,
	};
}

export default usePost;
