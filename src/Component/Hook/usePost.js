import {
	createDealAxios,
	createHousingAxios,
	createJobAxios,
	createMarketplaceAxios,
	findServiceAxios,
	patchDealAxios,
	patchHousingAxios,
	patchJobAxios,
	patchMarketplaceAxios,
	removeServiceAxios,
} from "../../Axios/axiosPromise";
import {
	FORWARD_CLOSE,
	FORWARD_SUCCESS,
	PROFILE_ID_PROP,
	SEARCH_DEAL,
	SEARCH_HOUSING,
	SEARCH_JOB,
	SEARCH_MARKETPLACE,
	SEARCH_SERVICE,
} from "../../Util/ConstVar";
import { errorMessage, loadingMessage, successMessage } from "./useMessage";
import useUrls from "./useUrls";

function usePost() {
	const { forwardUrl } = useUrls();

	const findService = async (id = -1, ownerId = -1, type = "") => {
		loadingMessage("Loading ...", 0);

		return findServiceAxios(id, ownerId, type)
			.then((res = {}) =>
				successMessage(`done`, 1, { className: "d-none" }).then(() =>
					Promise.resolve(res)
				)
			)
			.catch((e) => errorMessage(e));
	};

	const removeService = async (id = null, ownerId = null, forward = true) => {
		loadingMessage("Removing ...", 0);

		return removeServiceAxios(id, ownerId)
			.then(() =>
				successMessage(`Service removed successfully`).then(() =>
					forward ? forwardUrl(FORWARD_CLOSE) : window.location.reload(false)
				)
			)
			.catch((e) => errorMessage(e));
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
				successMessage(`Updated service information successfully`).then(() => {
					window.scrollTo({
						top: 0,
						behavior: "smooth",
					});
					return Promise.resolve();
				})
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
				successMessage(`Updated service information successfully`).then(() => {
					window.scrollTo({
						top: 0,
						behavior: "smooth",
					});
					return Promise.resolve();
				})
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
				successMessage(`Updated service information successfully`).then(() => {
					window.scrollTo({
						top: 0,
						behavior: "smooth",
					});
					return Promise.resolve();
				})
			)
			.catch((e) => errorMessage(e));
	};

	// martketplace service

	const createMarketplace = async (ownerId = null, info = {}) => {
		loadingMessage("Creating service ...", 0);

		return createMarketplaceAxios({ [`${PROFILE_ID_PROP}`]: ownerId, ...info })
			.then((id = null) =>
				successMessage(`Service Created successfully`).then(() =>
					forwardUrl(
						FORWARD_SUCCESS,
						"",
						"",
						`/${SEARCH_SERVICE}/${SEARCH_MARKETPLACE}/${id}`
					)
				)
			)
			.catch((e) => errorMessage(e));
	};

	const updateMarketplace = async (id = null, ownerId = null, info = {}) => {
		loadingMessage("Updating service information...", 0);

		return patchMarketplaceAxios(id, {
			[`${PROFILE_ID_PROP}`]: ownerId,
			...info,
		})
			.then(() =>
				successMessage(`Updated service information successfully`).then(() => {
					window.scrollTo({
						top: 0,
						behavior: "smooth",
					});
					return Promise.resolve();
				})
			)
			.catch((e) => errorMessage(e));
	};

	return {
		findService,
		removeService,
		updateDeal,
		createDeal,
		createJob,
		updateJob,
		createHousing,
		updateHousing,
		createMarketplace,
		updateMarketplace,
	};
}

export default usePost;
