import { useCallback, useEffect, useState } from "react";

function useGoogleAutoComplete() {
	// address = "test"
	// id = "",
	// required = false,
	// value = "",
	// className = "",
	// placeholder = "Address",
	// style = {},
	// onMergeStorage = () => {},
	// onLoadDefaultValue = () => {},
	// showAddressList = false,
	const [loading, setLoading] = useState(true);

	const [autoComplete, setAutoComplete] = useState({});

	const initAutocomplete = async () => {
		setAutoComplete(new window.google.maps.places.AutocompleteService());
	};

	const init = useCallback(async () => {
		if (JSON.stringify(autoComplete) === "{}" && window.google) {
			await initAutocomplete();
		}
	}, [autoComplete]);

	const fetchPredictions = (address = "") =>
		autoComplete.getPlacePredictions({
			input: address,
			componentRestrictions: { country: "US" },
			types: ["geocode"],
		});

	useEffect(() => {
		if (loading) {
			// init autocomplate
			init();
			setLoading(false);
		}
	}, [init, loading, setLoading]);

	return { fetchPredictions };
}

export default useGoogleAutoComplete;
