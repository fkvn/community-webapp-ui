import { searchCompanyAxios } from "../../Axios/axiosPromise";
import { SEARCH_BUSINESS } from "../../Util/ConstVar";
import { errorMessage, loadingMessage, successMessage } from "./useMessage";

function useSearch() {
	const searchCompany = (params = {}) =>
		searchCompanyAxios({
			...params,
		});

	const onSearchHandle = (type = "", params = {}) => {
		switch (type) {
			case SEARCH_BUSINESS:
				return searchCompany(params);
			default:
				return Promise.reject(`Search by ${type} is not supported yet`);
		}
	};

	const dispatchSearch = async (type = "", params = {}) => {
		loadingMessage(`Searching for ${type} in the area ...`, 0, {
			className: "",
			style: { marginTop: "8vh" },
		});

		onSearchHandle(type, params)
			.then(() => successMessage(`done`, 1, { className: "d-none" }))
			.catch((e) => errorMessage(e));
	};

	return {
		dispatchSearch,
	};
}

export default useSearch;
