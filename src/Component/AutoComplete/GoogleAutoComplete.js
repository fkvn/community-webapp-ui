import React, { useCallback, useEffect, useState } from "react";
import * as util from "../../Util/Util";
import DropDownFormControl from "../Form/FormControl/DropDownFormControl";

function GoogleAutoComplete({
	id = "",
	required = false,
	placeholder = "Address",
	onAddressValidation = () => {},
	onMergeStorageSession = () => {},
	onLoadDefaultValue = () => {},
}) {
	const [loading, setLoading] = useState(true);

	const [autoComplete, setAutoComplete] = useState({});

	const addressRef = React.createRef("");

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

		if (description.length === 0) onAddressValidation(true);
		// notify that address is not valid because it is changing
		else {
			onAddressValidation(false);
		}

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

			// update ref
			if (addressRef.current) {
				addressRef.current.value = selectedAddress.description || "";
			}

			// double-check in case placeid is missing
			if (selectedAddress.description && selectedAddress.placeid.length === 0) {
				// notify that address is not valid because it is changing
				onAddressValidation(false);
			} else {
				// notify that address is valid
				onAddressValidation(true);
			}

			// reset prediction list to hide the dropdown
			setPredictions([]);
		},
		[addressRef, onMergeStorageSession, onAddressValidation]
	);

	useEffect(() => {
		if (loading) {
			// init autocomplate
			init();

			// load default Value
			const defaultAddress = onLoadDefaultValue() || {};

			if (addressRef.current) {
				addressRef.current.value = defaultAddress.description || "";
				onSelectPredictionHandler(defaultAddress);
			}

			setLoading(false);
		}

		util.scrollToActiveElement();
	}, [
		init,
		loading,
		setLoading,
		addressRef,
		onLoadDefaultValue,
		onSelectPredictionHandler,
	]);

	const app = (
		<DropDownFormControl
			{...(id && { id: id })}
			required={required}
			ref={addressRef}
			placeholder={placeholder}
			dropdownItems={predictions || []}
			onChangeHandler={onAddressChangeHandler}
			onSelectItemHandler={onSelectPredictionHandler}
		/>
	);

	return app;
}

export default GoogleAutoComplete;
