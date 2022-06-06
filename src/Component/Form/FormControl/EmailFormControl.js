import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import * as util from "../../../Util/Util";

function EmailFormControl(props, ref) {
	// ==================== config =====================

	const {
		id = "",
		className = "p-3",
		required = true,
		autoFocus = false,
		displayWaningMessage = true,
		getWarningMessage = () => {},
		autoComplete = false,
		withLabel = true,
		defaultValue = "",
		disabled = false,
		onChange = () => {},
	} = props;

	const [warningMessage, setWarningMessage] = useState(null);

	const [loadDefaultValue, setLoadDefaultValue] = useState(false);

	// ==================== function =====================

	const validateEmail = useCallback(
		(address) => {
			const isValidFormatEmail = util.isValidEmailFormat(address);

			onChange(address, isValidFormatEmail);

			if (isValidFormatEmail) setWarningMessage("");
			else setWarningMessage("Sorry, your email address is invalid.");
		},
		[onChange]
	);

	// ==================== hook =====================

	useEffect(() => {
		if (!loadDefaultValue && ref.current) {
			ref.current.value = defaultValue;
			setLoadDefaultValue(true);
			validateEmail(defaultValue);
		}

		getWarningMessage(warningMessage);
	}, [
		loadDefaultValue,
		ref,
		getWarningMessage,
		warningMessage,
		defaultValue,
		validateEmail,
	]);

	// ==================== component =====================

	const app = (
		<>
			{withLabel && (
				<Form.Label
					{...(id && { htmlFor: id })}
					className={`fs-5 ${required && "tedkvn-required"} }`}
				>
					Email
				</Form.Label>
			)}
			<FormControl
				{...(id && { id: id })}
				ref={ref}
				type="email"
				placeholder="Enter email"
				className={`tedkvn-formControl ${className}`}
				onChange={(e) => validateEmail(e.target.value)}
				required={required}
				autoFocus={autoFocus}
				role="presentation"
				autoComplete={autoComplete ? "" : "off"}
				disabled={disabled}
			/>
			{displayWaningMessage && warningMessage && (
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
export default forwardRef(EmailFormControl);
