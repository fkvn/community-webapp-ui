import { useSelector } from "react-redux";
import GoogleAutoComplete from "../../../../Component/AutoComplete/GoogleAutoComplete";

import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../Util/ConstVar";

function SearchLocationFormControlContainer({
	id = "",
	placeholder = "",
	required = true,
	className = "",
	style = {},
	// onAddressValidation = () => {},
}) {
	const [address, showAddressList] = useSelector((state) => [
		state.thainowReducer[`${constVar.THAINOW_SEARCH_OBJ}`][
			`${constVar.SEARCH_LOCATION_PROP}`
		] || {},
		state.thainowReducer[`${constVar.THAINOW_SEARCH_OBJ}`].showAddressList ||
			false,
	]);

	const updateReduxStoreAddress = (
		description = "",
		placeid = "",
		show = false
	) => {
		dispatchPromise.patchSearchInfo({
			[`${constVar.SEARCH_LOCATION_PROP}`]: {
				description: description,
				...(placeid && { placeid: placeid }),
			},
			showAddressList: show,
		});
	};

	const onMergeStorageHandler = (value = "", onSelect = false) => {
		const description = onSelect ? value.description : value || "";
		const placeid = onSelect ? value.placeid : "";

		// update store
		updateReduxStoreAddress(
			description,
			placeid,
			description.length > 0 && !onSelect
		);

		// // check if placeid is missing
		// if (description.length > 0 && placeid.length === 0) {
		// 	// notify that address is not valid because it is changing
		// 	onAddressValidation(false);
		// } else {
		// 	// notify that address is valid
		// 	onAddressValidation(true);
		// }
	};

	// this is to check when the field is filled by redux store value changed
	// useEffect(() => {
	// 	// check if placeid is missing

	// 	const { description = "", placeid = "" } = address;

	// 	if (description.length > 0 && placeid.length === 0) {
	// 		// notify that address is not valid because it is changing
	// 		onAddressValidation(false);
	// 	} else {
	// 		// notify that address is valid
	// 		onAddressValidation(true);
	// 	}
	// }, [address, onAddressValidation]);

	const searchInputControl = (
		<GoogleAutoComplete
			{...(id && { id: id })}
			{...(placeholder && { placeholder: placeholder })}
			{...(className && { className: className })}
			value={address.description || ""}
			showAddressList={showAddressList}
			required={required}
			style={style}
			onMergeStorage={onMergeStorageHandler}
			// onLoadDefaultValue={onLoadDefaultValueHandler}
		/>
	);

	const app = <>{searchInputControl}</>;
	return app;
}

export default SearchLocationFormControlContainer;
