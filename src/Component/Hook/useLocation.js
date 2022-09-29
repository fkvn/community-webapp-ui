import { useSelector } from "react-redux";
import { patchLocationInfoPromise } from "../../redux-store/dispatchPromise";
import {
	ADDRESS_PROP,
	LOCATION_OBJ,
	PLACEID_PROP,
	SEARCH_DEFAULT_LOCATION,
} from "../../Util/ConstVar";
import { isObjectEmpty } from "../../Util/Util";

function useLocation(init = true) {
	const location = useSelector(
		(state) => state.thainowReducer[`${LOCATION_OBJ}`] || {}
	);

	const getStoredLocation = () => {
		const storedLocation =
			JSON.parse(sessionStorage.getItem(LOCATION_OBJ)) || {};

		const address = storedLocation?.[`${ADDRESS_PROP}`] || "";

		const placeid = storedLocation?.[`${PLACEID_PROP}`] || "";

		if (address === "" || placeid === "") {
			return {
				...SEARCH_DEFAULT_LOCATION,
			};
		}

		return storedLocation;
	};

	const initLocation = () => {
		if (isObjectEmpty(location)) {
			const defaultLocation = getStoredLocation();

			sessionStorage.setItem(LOCATION_OBJ, JSON.stringify(defaultLocation));
			patchLocationInfoPromise(defaultLocation);
		}

		return [location];
	};

	if (init) {
		initLocation();
	}

	return {
		location,
		initLocation,
		getStoredLocation,
	};
}

export default useLocation;
