import React, { useCallback, useEffect, useState } from "react";
import * as util from "../../Util/Util";
import DropDownFormControl from "../Form/FormControl/DropDownFormControl";

function GoogleAutoComplete({
	id = "",
	required = false,
	value = "",
	placeholder = "Address",
	onMergeStorageSession = () => {},
	onLoadDefaultValue = () => {},
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

	const onAddressChangeHandler = (description = "") => {
		// merge to storage session with description only, remove placeid
		onMergeStorageSession(description);

		// update predictions
		if (description !== "") {
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
		} else {
			setPredictions([]);
		}
	};

	const onSelectPredictionHandler = useCallback(
		(selection = {}) => {
			// selection
			const selectedAddress = {
				description: selection.description || "",
				placeid: selection.placeid || "",
			};

			// update address + merge to storage session
			onMergeStorageSession(
				selectedAddress.description,
				selectedAddress.placeid
			);

			// reset prediction list to hide the dropdown
			setPredictions([]);
		},
		[onMergeStorageSession]
	);

	useEffect(() => {
		if (loading) {
			// init autocomplate
			init();

			// load default Value
			onLoadDefaultValue();

			setLoading(false);
		}

		util.scrollToActiveElement();
	}, [init, loading, setLoading, onLoadDefaultValue]);

	const app = (
		<DropDownFormControl
			{...(id && { id: id })}
			required={required}
			value={value}
			placeholder={placeholder}
			dropdownItems={predictions || []}
			onChangeHandler={onAddressChangeHandler}
			onSelectItemHandler={onSelectPredictionHandler}
		/>
	);

	return app;
}

export default GoogleAutoComplete;
