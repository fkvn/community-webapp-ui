import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Toast } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Form } from "react-bootstrap";

import * as util from "../../Util/util";

function GoogleAutoComplete({
	id = "",
	withLabel = true,
	required = true,
	sessionStorageObj = "autocomplete",
}) {
	// ==================== config =====================

	const [autoComplete, setAutoComplete] = useState({});

	const [isLoad, setIsLoad] = useState(false);

	const [address, setAddress] = useState({
		description: "",
		placeid: "",
		predictions: [],
		warningMessage: "",
	});

	const addressRef = React.createRef(null);

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

	const onAddressChangeHandler = (description) => {
		if (description !== "") {
			getPlacePredictionPromise(description).then((res) => {
				setAddress({
					description: description,
					predictions: res.predictions,
					warningMessage: res.predictions.length > 0 ? "" : "Invalid Address",
				});
			});
		} else {
			setAddress({
				description: description,
				predictions: [],
				warningMessage: "",
			});
		}
	};

	// ==================== hook =====================

	useEffect(() => {
		if (!isLoad) {
			init();

			const defaultAddressObj =
				JSON.parse(sessionStorage.getItem(sessionStorageObj)) || {};

			const defaultPlaceid = defaultAddressObj?.address?.placeid || "";

			if (defaultPlaceid.length > 0) {
				setAddress({
					...address,
					description: defaultAddressObj?.address?.description || "",
					placeid: defaultAddressObj?.address?.placeid || "",
				});
			}

			setIsLoad(true);
		}
	}, [init, isLoad, sessionStorageObj, address]);

	useEffect(() => {
		const addressObj = {
			description: address.description || "",
			placeid: address.placeid || "",
		};

		if (addressRef.current) {
			addressRef.current.value = addressObj.description;
		}

		sessionStorage.setItem(
			sessionStorageObj,
			JSON.stringify({
				...(JSON.parse(sessionStorage.getItem(sessionStorageObj)) || {}),
				address: addressObj.placeid.length > 0 ? addressObj : {},
			})
		);

		util.scrollToActiveElement();
	}, [address, addressRef, sessionStorageObj]);

	// ==================== component =====================

	const predictionDropDown = address?.predictions?.length > 0 && (
		<Form.Group>
			<Toast
				{...(id && { htmlFor: id })}
				className="predictionDropDown position-relative w-100"
			>
				<Toast.Body className="border-0">
					<ListGroup
						as="ul"
						style={{ scrollbarWidth: "thin !important" }}
					></ListGroup>
					{address?.predictions?.map((prediction, idx) => (
						<ListGroup.Item as="li" key={idx}>
							<Button
								variant="link"
								className="text-dark text-decoration-none p-0"
								onClick={() => {
									setAddress({
										description: prediction.description,
										placeid: prediction.place_id,
										predictions: [],
									});
								}}
							>
								{prediction.description}
							</Button>
						</ListGroup.Item>
					))}
				</Toast.Body>
			</Toast>
		</Form.Group>
	);

	const app = (
		<>
			{withLabel && (
				<Form.Label
					{...(id && { htmlFor: id })}
					className={`fs-5 ${required && "tedkvn-required"} `}
				>
					Address
				</Form.Label>
			)}

			<FormControl
				{...(id && { id: id })}
				type="address"
				ref={addressRef}
				placeholder="Enter a place"
				className="formControl p-3"
				required={required}
				role="representation"
				onChange={(p) => {
					onAddressChangeHandler(p.target.value);
				}}
			/>

			{predictionDropDown}

			{address.warningMessage && (
				<Form.Text className="text-muted">
					<span className="text-danger">
						<small>{address.warningMessage}! </small>
					</span>
				</Form.Text>
			)}

			{!address.placeid && address.description && (
				<Form.Text className="text-muted ">
					<span className="text-danger">
						<small> Please select a valid address</small>
					</span>
				</Form.Text>
			)}
		</>
	);

	return app;
}

export default GoogleAutoComplete;
