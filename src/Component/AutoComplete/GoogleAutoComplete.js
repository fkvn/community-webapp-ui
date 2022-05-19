import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Toast } from "react-bootstrap";
import { Form } from "react-bootstrap";

import * as util from "../../Util/util";

function GoogleAutoComplete({
	id = "",
	withLabel = true,
	required = true,
	defaultAddressObj = {},
	addressObj = {},
	onSelectLocation = () => {},
}) {
	// ==================== config =====================

	const [autoComplete, setAutoComplete] = useState({});

	const initAutocomplete = async () => {
		setAutoComplete(new window.google.maps.places.AutocompleteService());
	};

	const init = () => {
		if (JSON.stringify(autoComplete) === "{}" && window.google) {
			initAutocomplete();
		}
	};

	const [address, setAddress] = useState({
		description: addressObj?.description,
		placeId: addressObj?.placeId,
		predictions: [],
		warningMessage: "",
	});

	const [cursor, setCursor] = useState();

	const [loadDefaultValue, setLoadDefaultValue] = useState(false);

	// ==================== functions =====================

	const resetAddressState = () => {
		setAddress({
			description: "",
			predictions: [],
			warningMessage: "",
		});
	};

	const getPlacePredictionPromise = (address) => {
		return autoComplete.getPlacePredictions({
			input: address,
			componentRestrictions: { country: "US" },
			types: ["geocode"],
		});
	};

	const onAddressChangeHandler = (address) => {
		if (address.length === 0) resetAddressState();
		else {
			getPlacePredictionPromise(address).then((res) => {
				console.log(address);
				setAddress({
					description: address,
					predictions: res.predictions,
					warningMessage: res.predictions.length > 0 ? "" : "Invalid Address",
				});
			});
		}
	};

	const toggleDropdownPredictions = () => {
		const dropdown = document.getElementById("predictionDropDown");

		if (address?.predictions?.length > 0) {
			if (dropdown.classList.contains("d-none")) {
				dropdown.classList.remove("d-none");
			}

			if (!dropdown.classList.contains("d-block")) {
				dropdown.classList.add("d-block");
			}
		} else {
			dropdown.classList.add("d-none");
		}
	};

	const updateCursorPostion = () => {
		const input = ref.current;
		if (input) input.setSelectionRange(cursor, cursor);
	};

	useEffect(() => {
		if (
			(!loadDefaultValue || JSON.stringify(addressObj) === "{}") &&
			JSON.stringify(defaultAddressObj) !== "{}"
		) {
			if (!loadDefaultValue) setLoadDefaultValue(true);
			setAddress({
				description: defaultAddressObj?.description,
				placeId: defaultAddressObj?.placeId,
				predictions: [],
				warningMessage: "",
			});
		} else {
			setAddress({
				description: addressObj?.description,
				placeId: addressObj?.placeId,
				predictions: [],
				warningMessage: "",
			});
		}
	}, [addressObj, defaultAddressObj, loadDefaultValue]);

	// ==================== hook =====================

	useEffect(() => {
		init();

		toggleDropdownPredictions();

		updateCursorPostion();

		util.scrollToActiveElement();
	});

	// ==================== component =====================

	const predictionDropDown = (
		<Form.Group>
			<Toast
				id="predictionDropDown"
				className="position-relative d-none w-100"
				style={{
					maxHeight: "10rem",
					maxWidth: "30rem",
					overflow: "auto",
					padding: "1px !important",
				}}
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
									onSelectLocation({
										description: prediction.description,
										placeId: prediction.place_id,
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

	const ref = useRef(null);

	const app = (
		<>
			{withLabel && (
				<Form.Label
					{...(id && { htmlFor: id })}
					className={`fs-5 ${required && "tedkvn-required"} }`}
				>
					Address
				</Form.Label>
			)}

			<FormControl
				{...(id && { id: id })}
				type="address"
				ref={ref}
				placeholder="Enter a place"
				value={address.description ? address.description : ""}
				className="formControl p-3"
				onChange={(p) => {
					setCursor(p.currentTarget.selectionStart);
					onAddressChangeHandler(p.target.value);
				}}
				required={true}
				autoComplete="off"
			/>

			{predictionDropDown}

			{address.warningMessage && (
				<Form.Text className="text-muted">
					<span className="text-danger">
						<small>{address.warningMessage}! </small>
					</span>
				</Form.Text>
			)}

			{!address.placeId && address.description && (
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
