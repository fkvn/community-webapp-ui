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

	// const [predictions, setPredictions] = useState([]);

	// const onUpdatePredictionHanlder = (value, onSelect = false) => {
	// 	const description = onSelect ? value.description : value || "";

	// 	// update predictions
	// 	if (onSelect || description === "") {
	// 		setPredictions([]);
	// 	} else {
	// 		getPlacePredictionPromise(description).then((res) => {
	// 			setPredictions(
	// 				res.predictions.map((prediction) => {
	// 					return {
	// 						description: prediction.description,
	// 						placeid: prediction.place_id,
	// 					};
	// 				})
	// 			);
	// 		});
	// 	}
	// };

	const fetchPredictions = (address) =>
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

	// return app;
}

export default useGoogleAutoComplete;

// export default GoogleAutoComplete;
