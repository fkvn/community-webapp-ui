import React, { useCallback, useState } from "react";
import * as constVar from "../../Util/ConstVar";
import DropDownFormControl from "../Form/FormControl/DropDownFormControl";

function NewGoogleAutoComplete({
	id = "",
	required = false,
	placeholder = "Address",
	sessionStorageObjName = "",
	sessionStoragePropName = constVar.STORAGE_ADDRESS_PROP,
}) {
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

	// const onAddressChangeHandler = (description) => {
	// 	if (description !== "") {
	// 		getPlacePredictionPromise(description).then((res) => {
	// 			setAddress({
	// 				description: description,
	// 				predictions: res.predictions,
	// 				warningMessage: res.predictions.length > 0 ? "" : "Invalid Address",
	// 			});
	// 		});
	// 	} else {
	// 		setAddress({
	// 			description: description,
	// 			predictions: [],
	// 			warningMessage: "",
	// 		});
	// 	}
	// };

	const app = (
		<DropDownFormControl
			{...(id && { id: id })}
			required={required}
			placeholder={placeholder}
			dropdownItems={predictions || []}
		/>
	);

	return app;
}

export default NewGoogleAutoComplete;
