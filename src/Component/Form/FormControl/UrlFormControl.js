import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";

function UrlFormControl(props, ref) {
	// ==================== config =====================

	const {
		id = "",
		withLabel = false,
		labelTitle = "Website Address",
		placeholder = "http(s)://",
		className = "p-3",
		required = false,
		defaultValue = "",
		onChange = () => {},
	} = props;

	const [loadDefaultValue, setLoadDefaultValue] = useState(false);

	const [warningMessage, setWarningMessage] = useState("");

	// ==================== funcs =====================

	const isValidUrl = useCallback((url = "") => {
		let condition =
			url.length === 0 ||
			/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g.test(
				url
			);

		if (condition) return true;

		return false;
	}, []);

	const validateUrl = useCallback(
		(url) => {
			const validUrl = isValidUrl(url);
			onChange(url, validUrl);
			if (validUrl || url === "") setWarningMessage("");
			else setWarningMessage("Please  a valid domain with http(s)");
		},
		[isValidUrl, onChange]
	);

	// ==================== hook =====================

	useEffect(() => {
		if (!loadDefaultValue && ref.current) {
			ref.current.value = defaultValue;
			setLoadDefaultValue(true);
			validateUrl(ref.current.value);
		}
	}, [loadDefaultValue, ref, defaultValue, validateUrl]);

	// ==================== component =====================

	const app = (
		<>
			{withLabel && (
				<Form.Label
					{...(id && { htmlFor: id })}
					className={`fs-5 ${required && "tedkvn-required"} }`}
				>
					{labelTitle}
				</Form.Label>
			)}
			<Form.Control
				{...(id && { id: id })}
				ref={ref}
				type="url"
				className={`tedkvn-formControl ${className}`}
				placeholder={placeholder}
				required={required}
				onChange={(urlRef) => validateUrl(urlRef.target.value)}
			/>
			{warningMessage.length > 0 && (
				<Form.Text className="text-muted">
					<span className="text-danger">{warningMessage}</span>
				</Form.Text>
			)}
		</>
	);

	// ==================== render =====================

	return app;
}

// forward ref component
export default forwardRef(UrlFormControl);
