import { useSearchParams } from "react-router-dom";
import { searchCompanyAxios } from "../../Axios/axiosPromise";
import {
	SEARCH_BUSINESS,
	SEARCH_KEYWORD,
	SEARCH_TYPE_PROP,
} from "../../Util/ConstVar";
import { getSearchParamsObj } from "../../Util/Util";
import { errorMessage, loadingMessage, successMessage } from "./useMessage";

function useSearch() {
	const [searchParams, setSearchParams] = useSearchParams();
	const keywordParam = searchParams.get(SEARCH_KEYWORD) || "";
	const searchTypeParam = searchParams.get(SEARCH_TYPE_PROP) || "";

	const searchCompany = (params = "") =>
		searchCompanyAxios(params).catch((e) => errorMessage(e));

	const onSearchHandle = async (type = "", params = "") => {
		switch (type) {
			case SEARCH_BUSINESS:
				return searchCompany(params);
			default:
				return errorMessage(`Search by ${type} is not supported yet`);
		}
	};

	const dispatchSearch = async (type = SEARCH_BUSINESS, params = {}) => {
		loadingMessage(`Searching for ${type} in the area ...`, 0, {
			className: "",
			style: { marginTop: "8vh" },
		});

		if (type !== searchTypeParam) {
			params = {
				[`${SEARCH_TYPE_PROP}`]: type,
				[`${SEARCH_KEYWORD}`]: keywordParam,
			};
		} else {
			const currentParamsObj = getSearchParamsObj(searchParams);
			params = {
				...currentParamsObj,
				...params,
				[`${SEARCH_TYPE_PROP}`]: type,
			};
		}

		params = new URLSearchParams(params);

		return onSearchHandle(type, params.toString()).then(() =>
			successMessage(`done`, 1, { className: "d-none" }).then(() => {
				setSearchParams(params);
				return Promise.resolve();
			})
		);
	};

	return {
		dispatchSearch,
	};
}

export default useSearch;
