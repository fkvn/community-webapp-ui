import { useSelector } from "react-redux";
import FormControlControlled from "../../../../Component/Form/FormControl/FormControlControlled";

import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../Util/ConstVar";

function SearchInputFormControlContainer({
	id = "",
	className = "",
	placeholder = "Search for?",
	required = true,
	style = {},
}) {
	const searchInput = useSelector(
		(state) =>
			state.thainowReducer[`${constVar.THAINOW_SEARCH_OBJ}`][
				`${constVar.SEARCH_INPUT_PROP}`
			] || ""
	);

	const updateReduxStoreSearchInput = (query = "") => {
		dispatchPromise.patchSearchInfo({
			[`${constVar.SEARCH_INPUT_PROP}`]: query,
		});
	};

	const onMergeStorageHandler = (query = "") => {
		// update store
		updateReduxStoreSearchInput(query);
	};

	const searchInputControl = (
		<FormControlControlled
			{...(id && { id: id })}
			type="search"
			value={searchInput}
			style={style}
			className={className}
			placeholder={placeholder}
			required={required}
			onMergeStorage={onMergeStorageHandler}
			// onLoadDefaultValue={onLoadDefaultValueHandler}
		/>
	);

	const app = <>{searchInputControl}</>;
	return app;
}

export default SearchInputFormControlContainer;
