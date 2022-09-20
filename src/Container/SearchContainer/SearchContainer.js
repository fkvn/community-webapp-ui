import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { findCompany } from "../../Axios/axiosPromise";
import PageLayout from "../../Component/PageLayout/PageLayout";
import {
	patchLocationInfoPromise,
	submitErrorHandlerPromise,
} from "../../redux-store/dispatchPromise";
import { ADDRESS_PROP, LOCATION_OBJ, PLACEID_PROP } from "../../Util/ConstVar";

function SearchContainer() {
	const [searchParams, setSearchParams] = useSearchParams();

	const keywords = searchParams.get("keywords") || "";

	const submit = searchParams.get("submit") || "false";

	const searchType = searchParams.get("type") || "companies";

	const location = useSelector(
		(state) => state.thainowReducer[`${LOCATION_OBJ}`] || {}
	);

	useEffect(() => {
		if (JSON.stringify(location) === "{}") {
			const defaultLocation = JSON.parse(
				sessionStorage.getItem("location")
			) || {
				[`${ADDRESS_PROP}`]: "",
				[`${PLACEID_PROP}`]: "",
			};

			sessionStorage.setItem("location", JSON.stringify(defaultLocation));
			patchLocationInfoPromise(defaultLocation);
		}
	}, [location]);

	const [searchResult, setSearchResult] = useState({
		totalPage: 1,
		totalCount: 0,
		fetchHits: [],
	});

	const initSearch = useCallback(() => {
		if (submit === "true") {
			let address = location?.[`${ADDRESS_PROP}`] || "";
			let placeid = location?.[`${PLACEID_PROP}`] || "";

			const validLocation =
				address === "" || (address !== "" && placeid !== "");

			if (!validLocation) {
				submitErrorHandlerPromise("Please select a location!");
			} else {
				if (address === "") {
					address = "Thai Town, Los Angeles, CA 90027, USA";
					placeid = "ChIJf2z2Hle_woARaNaIiR198fg";
				}

				const promise = () => {
					if (searchType === "companies") {
						return findCompany({
							keywords: keywords,
							address: address,
							placeid: placeid,
						});
					}
				};

				promise().then(({ data }) => {
					sessionStorage.setItem("location", JSON.stringify(data.location));
					patchLocationInfoPromise({ ...data.location }, true);
				});

				const controller = new AbortController();
				controller.abort();
			}
			searchParams.set("submit", false);
			setSearchParams(searchParams);
		}
	}, [location, keywords, searchParams, setSearchParams, submit, searchType]);

	useEffect(() => {
		initSearch(submit);
	}, [initSearch, keywords, submit]);

	const app = (
		<>
			<PageLayout keywords={keywords} />
		</>
	);

	return app;
}

export default SearchContainer;
