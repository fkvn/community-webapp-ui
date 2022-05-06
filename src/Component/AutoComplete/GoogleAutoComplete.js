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

function GoogleAutoComplete() {
	// ==================== config =====================

	const [autoComplete, setAutoComplete] = useState({});

	const API_KEY = "AIzaSyBqJ5NdeFsoJ88Qmd_x-T2RIJRHtpzqNw0";

	const SCRIPT_SRC = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initAutocomplete`;

	const initAutocomplete = () => {
		setAutoComplete(new window.google.maps.places.AutocompleteService());
	};

	const init = () => {
		if (JSON.stringify(autoComplete) === "{}" && !window.initAutocomplete) {
			util.loadScript(SCRIPT_SRC, true, true);
			window.initAutocomplete = initAutocomplete;
		}
	};

	const [address, setAddress] = useState({
		value: "",
		predictions: [],
		warningMessage: "",
	});

	const [cursor, setCursor] = useState();

	// ==================== functions =====================

	const resetAddressState = () => {
		setAddress({
			value: "",
			predictions: [],
			warningMessage: "",
		});
	};

	const getPlacePredictionList = (address) => {
		return autoComplete.getPlacePredictions({
			input: address,
			componentRestrictions: { country: "US" },
			types: ["geocode"],
		});
	};

	const onAddressChangeHandler = (address) => {
		if (address.length === 0) resetAddressState();
		else {
			getPlacePredictionList(address).then((res) => {
				console.log(res.predictions);
				setAddress({
					value: address,
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

	const scrollToActiveElement = () => {
		const activeElement = document.activeElement;
		activeElement.scrollIntoView({
			behavior: "auto",
			block: "start",
			inline: "nearest",
		});
	};

	// ==================== hook =====================

	useEffect(() => {
		init();

		toggleDropdownPredictions();

		scrollToActiveElement();

		const input = ref.current;
		if (input) input.setSelectionRange(cursor, cursor);
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
								onClick={() =>
									setAddress({
										value: prediction.description,
										placeId: prediction.place_id,
										predictions: [],
										warningMessage: "",
									})
								}
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
		<Form.Group className="my-4 fs-5   ">
			<Form.Label
				htmlFor="signup-addressControl"
				className="fs-5 tedkvn-required fw-bolder"
			>
				Address
			</Form.Label>
			<FormControl
				id="signup-addressControl"
				type="text"
				ref={ref}
				placeholder="Enter a place"
				value={address.value ? address.value : ""}
				className="p-3"
				onChange={(p) => {
					setCursor(p.currentTarget.selectionStart);
					onAddressChangeHandler(p.target.value);
				}}
				required={true}
			/>
			{predictionDropDown}

			{address.warningMessage && (
				<Form.Text className="text-muted">
					<span className="text-danger">{address.warningMessage}</span>
				</Form.Text>
			)}

			{!address.placeId && address.value && (
				<Form.Text className="text-muted ">
					<span className="text-danger">
						<small>Please select a valid address</small>
					</span>
				</Form.Text>
			)}
		</Form.Group>
	);

	return app;
}

export default GoogleAutoComplete;
