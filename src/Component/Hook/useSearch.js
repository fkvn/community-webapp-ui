import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import {
	searchCompanyAxios,
	searchDealsAxios,
	searchHousingsAxios,
	searchJobsAxios,
	searchMarketplacesAxios,
	searchReviewsAxios,
} from "../../Axios/axiosPromise";
import {
	patchLocationInfoPromise,
	patchSearchResultInfoPromise,
} from "../../redux-store/dispatchPromise";
import { thainowReducer } from "../../redux-store/reducer/thainowReducer";
import {
	ID_PROP,
	LOCATION_OBJ,
	POST_OWNER_ID_PROP,
	PROFILE_OBJ,
	SEARCH_BUSINESS,
	SEARCH_DEAL,
	SEARCH_FETCH_RESULT_PROP,
	SEARCH_HOUSING,
	SEARCH_JOB,
	SEARCH_KEYWORD,
	SEARCH_MARKETPLACE,
	SEARCH_PAGE_PROP,
	SEARCH_REQUESTER_ID,
	SEARCH_REVIEW,
	SEARCH_TYPE_PROP,
	TYPE_PROP,
} from "../../Util/ConstVar";
import { getSearchParamsObj } from "../../Util/Util";
import { errorMessage, loadingMessage, successMessage } from "./useMessage";

function useSearch() {
	const [searchParams, setSearchParams] = useSearchParams({ replace: false });
	const keywordParam = searchParams.get(SEARCH_KEYWORD) || "";
	const searchTypeParam = searchParams.get(SEARCH_TYPE_PROP) || "";

	const routeState = useLocation()?.state || {};

	const controller = new AbortController();
	const signal = controller.signal;

	const {
		[`${LOCATION_OBJ}`]: location = {},
		[`${PROFILE_OBJ}`]: { [`${ID_PROP}`]: requesterId = -1 } = {},
	} = useSelector(thainowReducer);

	const searchCompany = (params = "") =>
		searchCompanyAxios(params, signal).catch((e) => errorMessage(e));

	const searchDeals = (params = "") =>
		searchDealsAxios(params, signal).catch((e) => errorMessage(e));

	const searchJobs = (params = "") =>
		searchJobsAxios(params, signal).catch((e) => errorMessage(e));

	const searchHousings = (params = "") =>
		searchHousingsAxios(params, signal).catch((e) => errorMessage(e));

	const searchMarketplaces = (params = "") =>
		searchMarketplacesAxios(params, signal).catch((e) => errorMessage(e));

	const searchReview = (params = "") =>
		searchReviewsAxios(params, signal).catch((e) => errorMessage(e));

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
			case SEARCH_REVIEW:
				return searchReview(params);
			default:
				return errorMessage(`Search by ${type} is not supported yet`);
		}
	};

	const dispatchSearch = async ({
		type = searchTypeParam,
		params = {},
		loadMore = false,
		currentFetchResults = [],
		backToTop = true,
	} = {}) => {
		if (backToTop) {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}

		loadingMessage(`Searching for ${type} in the area ...`, 0, {
			className: "",
			style: { marginTop: "8vh" },
		});

		if (type !== searchTypeParam) {
			params = {
				[`${SEARCH_TYPE_PROP}`]: type,
				[`${SEARCH_KEYWORD}`]:
					params?.[`${SEARCH_KEYWORD}`] || keywordParam || "",
				[`${POST_OWNER_ID_PROP}`]: params?.[`${POST_OWNER_ID_PROP}`] || -1,
				[`${TYPE_PROP}`]: params?.[`${TYPE_PROP}`] || "",
				[`${ID_PROP}`]: params?.[`${ID_PROP}`] || "",
			};
		} else {
			const currentParamsObj = getSearchParamsObj(searchParams);
			params = {
				...currentParamsObj,
				...params,
				[`${SEARCH_TYPE_PROP}`]: type,
			};
		}

		//  add location
		params = { ...location, ...params };

		// add requesterId

		params = {
			...params,
			[`${SEARCH_REQUESTER_ID}`]: requesterId,
		};

		// load more page
		if (!loadMore) {
			params = { ...params, [`${SEARCH_PAGE_PROP}`]: 1 };
		}

		//

		params = new URLSearchParams(params);

		return onSearchHandle(type, params.toString()).then(
			async ({
				resLocation = {},
				[`${SEARCH_FETCH_RESULT_PROP}`]: newFetchResults = [],
				...result
			}) => {
				// cancel request
				if (controller) controller.abort();

				const { [`${POST_OWNER_ID_PROP}`]: ownerId = -1, ...updatedParams } =
					getSearchParamsObj(params);

				setSearchParams(new URLSearchParams(updatedParams), {
					state: { ...routeState },
				});

				return patchLocationInfoPromise(
					resLocation ? resLocation : location
				).then(() =>
					patchSearchResultInfoPromise(
						{
							[`${SEARCH_TYPE_PROP}`]: type,
							[`${SEARCH_FETCH_RESULT_PROP}`]: loadMore
								? [...currentFetchResults, ...newFetchResults]
								: newFetchResults,
							...result,
						},
						true
					).then(() =>
						successMessage(`done`, 1, { className: "d-none" }).then(() =>
							Promise.resolve(result)
						)
					)
				);
			}
		);
	};

	return {
		dispatchSearch,
	};
}

export default useSearch;
