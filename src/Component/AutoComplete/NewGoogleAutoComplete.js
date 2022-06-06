import React, { useCallback, useEffect, useState } from "react";
import * as constVar from "../../Util/ConstVar";
import * as util from "../../Util/Util";
import DropDownFormControl from "../Form/FormControl/DropDownFormControl";

function NewGoogleAutoComplete({
	id = "",
	required = false,
	placeholder = "Address",
	sessionStorageObjName = "",
	sessionStoragePropName = constVar.STORAGE_ADDRESS_PROP,
	onAddressValidation = () => {},
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

	const updateAddressDescription = (description = "") => {
		util.saveToSessionStore(sessionStorageObjName, sessionStoragePropName, {
			description: description,
		});
	};

	const updateAddress = (description = "", placeid = "") => {
		util.saveToSessionStore(sessionStorageObjName, sessionStoragePropName, {
			description: description,
			placeid: placeid,
		});
	};

	const onAddressChangeHandler = (description) => {
		// update description - placeid is removed cuz the address is changing
		updateAddressDescription(description);

		// notify that address is not valid because it is changing
		onAddressValidation(false);

		if (description !== "") {
			getPlacePredictionPromise(description).then((res) => {
				setPredictions(res.predictions);
			});
		} else {
			setPredictions([]);
		}
	};

	const onSelectPredictionHandler = (selection = {}) => {
		// selection
		const selectedAddress = {
			description: selection.description || "",
			placeid: selection.place_id || "",
		};

		// update address
		updateAddress(selectedAddress.description, selectedAddress.placeid);

		// update ref
		if (addressRef.current) {
			addressRef.current.value = selectedAddress.description || "";
		}

		// double-check in case placeid is missing
		if (!selectedAddress.placeid) {
			// notify that address is not valid because it is changing
			onAddressValidation(false);
		} else {
			// notify that address is valid
			onAddressValidation(true);
		}

		// reset prediction list to hide the dropdown
		setPredictions([]);
	};

	useEffect(() => {
		if (loading && addressRef.current) {
			// init autocomplate
			init();

			// get default value if any
			const defaultAddress = util.getSessionStorageObj(sessionStorageObjName)[
				`${sessionStoragePropName}`
			];

			// if placeid valid, get default value
			if (defaultAddress?.placeid?.length > 0) {
				addressRef.current.value = defaultAddress.description;
			}
			// else reset address object
			else {
				util.saveToSessionStore(
					sessionStorageObjName,
					sessionStoragePropName,
					{}
				);
			}

			setLoading(false);
		}

		util.scrollToActiveElement();
	}, [
		loading,
		setLoading,
		addressRef,
		init,
		sessionStorageObjName,
		sessionStoragePropName,
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

export default NewGoogleAutoComplete;
