import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { findCompany } from "../../Axios/axiosPromise";
import PageLayout from "../../Component/PageLayout/PageLayout";
import { LAT_PROP, LNG_PROP, LOCATION_OBJ } from "../../Util/ConstVar";

function SearchContainer() {
	const [searchParams, _] = useSearchParams();

	const keywords = searchParams.get("keywords") || "";

	const location = useSelector(
		(state) => state.thainowReducer[`${LOCATION_OBJ}`] || {}
	);

	const centerLat = location[`${LAT_PROP}`];
	const centerLng = location[`${LNG_PROP}`];

	const [searchResult, setSearchResult] = useState({
		totalPage: 1,
		totalCount: 0,
		fetchHits: [],
	});

	const initSearch = useCallback(() => {
		findCompany({
			keywords: keywords,
			centerLat: centerLat,
			centerLng: centerLng,
		}).then(({ data }) => {
			console.log(data);
		});

		const controller = new AbortController();
		controller.abort();
	}, [centerLat, centerLng, keywords]);

	useEffect(() => {
		initSearch();
	}, [initSearch, keywords]);

	const app = (
		<>
			<PageLayout keywords={keywords} />
		</>
	);

	return app;
}

export default SearchContainer;
