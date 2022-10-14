import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
	searchCompanyAxios,
	searchDealsAxios,
	searchHousingsAxios,
	searchJobsAxios,
	searchMarketplacesAxios,
} from "../../Axios/axiosPromise";
import {
	patchLocationInfoPromise,
	patchSearchResultInfoPromise,
} from "../../redux-store/dispatchPromise";
import {
	SEARCH_BUSINESS,
	SEARCH_DEAL,
	SEARCH_HOUSING,
	SEARCH_JOB,
	SEARCH_KEYWORD,
	SEARCH_MARKETPLACE,
	SEARCH_RESULT_OBJ,
	SEARCH_TYPE_PROP,
} from "../../Util/ConstVar";
import { getSearchParamsObj } from "../../Util/Util";
import { errorMessage, loadingMessage, successMessage } from "./useMessage";

function useSearch() {
	const [searchParams, setSearchParams] = useSearchParams();
	const keywordParam = searchParams.get(SEARCH_KEYWORD) || "";
	const searchTypeParam = searchParams.get(SEARCH_TYPE_PROP) || "";

	const searchResult = useSelector(
		(state) => state.thainowReducer[`${SEARCH_RESULT_OBJ}`] || {}
	);

	const searchCompany = (params = "") =>
		searchCompanyAxios(params).catch((e) => errorMessage(e));

	const searchDeals = (params = "") =>
		searchDealsAxios(params).catch((e) => errorMessage(e));

	const searchJobs = (params = "") =>
		searchJobsAxios(params).catch((e) => errorMessage(e));

	const searchHousings = (params = "") =>
		searchHousingsAxios(params).catch((e) => errorMessage(e));

	const searchMarketplaces = (params = "") =>
		searchMarketplacesAxios(params).catch((e) => errorMessage(e));

	const onSearchHandle = async (type = "", params = "") => {
		switch (type) {
			case SEARCH_BUSINESS:
				return searchCompany(params);
			case SEARCH_DEAL:
				return searchDeals(params);
			case SEARCH_JOB:
				return searchJobs(params);
			case SEARCH_HOUSING:
				return searchHousings(params);
			case SEARCH_MARKETPLACE:
				return searchMarketplaces(params);
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
				[`${SEARCH_KEYWORD}`]:
					params?.[`${SEARCH_KEYWORD}`] || keywordParam || "",
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

		return onSearchHandle(type, params.toString()).then(
			async ({ location = {}, ...result }) => {
				setSearchParams(params);

				return patchLocationInfoPromise(location).then(() =>
					patchSearchResultInfoPromise({
						[`${SEARCH_TYPE_PROP}`]: type,
						...result,
					}).then(() => successMessage(`done`, 1, { className: "d-none" }))
				);
			}
		);
	};

	return {
		searchResult,
		dispatchSearch,
	};
}

export default useSearch;
