import Icon from "@ant-design/icons";
import { Space } from "antd";
import { useSelector } from "react-redux";
import { iconLocationWhite } from "../../Assest/Asset";
import { patchLocationInfoPromise } from "../../redux-store/dispatchPromise";
import {
	ADDRESS_PROP,
	LOCATION_OBJ,
	PLACEID_PROP,
	SEARCH_DEFAULT_LOCATION,
} from "../../Util/ConstVar";
import { isObjectEmpty } from "../../Util/Util";
import EllipsisMiddle from "../Typography/EllipsisMiddle";

function useCurrentLocation(init = true) {
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

	const displayLocation = (
		props = {
			onClick: () => {},
			width: 50,
			containerClassName: "text-white w-100",
			iconStyle: {},
		}
	) => (
		<Space
			direction="horizontal"
			className={props.containerClassName}
			onClick={props.onClick}
		>
			<Icon
				component={() => iconLocationWhite(20)}
				width={props.width}
				className="tedkvn-center"
				style={props.iconStyle}
			/>
			<EllipsisMiddle suffixCount={5} className="text-white">
				{location?.[`${ADDRESS_PROP}`]}
			</EllipsisMiddle>
		</Space>
	);

	return {
		location,
		initLocation,
		getStoredLocation,
		displayLocation,
	};
}

export default useCurrentLocation;
