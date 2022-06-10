import { useCallback, useEffect, useState } from "react";
import DropDownFormControl from "../Form/FormControl/DropDownFormControl";

function GoogleAutoComplete({
	id = "",
	required = false,
	value = "",
	placeholder = "Address",
	onMergeStorage = () => {},
	onLoadDefaultValue = () => {},
	showAddressList = false,
	updateReduxStoreShowList = () => {},
}) {
	const [loading, setLoading] = useState(true);

	const [autoComplete, setAutoComplete] = useState({});

	const initAutocomplete = async () => {
		setAutoComplete(new window.google.maps.places.AutocompleteService());
	};

	const init = useCallback(() => {
		if (JSON.stringify(autoComplete) === "{}" && window.google) {
			initAutocomplete();
		}
	}, [autoComplete]);

	const getPlacePredictionPromise = (address) => {
		return autoComplete.getPlacePredictions({
			input: address,
			componentRestrictions: { country: "US" },
			types: ["geocode"],
		});
	};

	const [predictions, setPredictions] = useState([]);

	const onUpdatePredictionHanlder = (value, onSelect = false) => {
		const description = onSelect ? value.description : value || "";

		// update predictions
		if (onSelect || description === "") {
			setPredictions([]);
			updateReduxStoreShowList(false);
		} else {
			updateReduxStoreShowList(true);
			getPlacePredictionPromise(description).then((res) => {
				setPredictions(
					res.predictions.map((prediction) => {
						return {
							description: prediction.description,
							placeid: prediction.place_id,
						};
					})
				);
			});
		}
	};

	useEffect(() => {
		if (loading) {
			// init autocomplate
			init();

			setLoading(false);
		}
	}, [init, loading, setLoading]);

	const app = !loading && (
		<DropDownFormControl
			{...(id && { id: id })}
			required={required}
			value={value}
			placeholder={placeholder}
			dropdownItems={predictions || []}
			showDropdownItems={showAddressList}
			onLoadDefaultValue={onLoadDefaultValue}
			onMergeStorage={onMergeStorage}
			onUpdatePrediction={onUpdatePredictionHanlder}
		/>
	);

	return app;
}

export default GoogleAutoComplete;
