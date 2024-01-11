import { useSearchParams } from "react-router-dom";
import { fetchGuideBookAxios } from "../../../Axios/guideBookAxios";

function useGuideBookPost() {
	const [urlParams, setUrlParams] = useSearchParams();

	/**
	 *
	 * @param {URLSearchParams} searchParams
	 * @returns
	 */
	const extractExistingParams = (searchParams = urlParams) => {
		const entries = Array.from(searchParams.entries());
		return entries.reduce((res, keyValue) => {
			return { [`${keyValue[0]}`]: keyValue[1], ...res };
		}, {});
	};

	/**
	 *
	 * @param {Object} requestParams {key: value}
	 * @requestParamsKeyList profileId, requesterId, keywords, category, status,sortBy, sortByOrder, page, limit
	 */
	const fetchGuideBookPost = async (requestParams = {}) => {
		const fetchedParams = { ...extractExistingParams(), ...requestParams };

		return fetchGuideBookAxios(fetchedParams).then((res) => {
			// update url params
			setUrlParams(fetchedParams);
			// return search result
			return res;
		});
	};

	return {
		fetchGuideBookPost,
	};
}
export default useGuideBookPost;
