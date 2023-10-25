import { createReviewAxios, patchReviewAxios } from "../../Axios/axiosPromise";
import { errorMessage, loadingMessage, successMessage } from "./useMessage";

function useReview() {
	const createReview = (info = {}) => {
		loadingMessage("Loading...", 0);
		return createReviewAxios(info)
			.then((res = {}) =>
				successMessage("Review created successfully").then(() =>
					Promise.resolve(res)
				)
			)
			.catch((e) => errorMessage(e));
	};

	const patchReview = (id = null, info = {}) => {
		console.log(id);
		console.log(info);

		loadingMessage("Updating...", 0);

		return patchReviewAxios(id, info)
			.then(() => successMessage("Updated successfully"))
			.catch((e) => errorMessage(e));
	};

	return {
		createReview,
		patchReview,
	};
}

export default useReview;
