import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { forwardRef } from "react";
import { Form } from "react-bootstrap";
import { FormControl } from "react-bootstrap";

import * as util from "../../Util/util";

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
	} = props;

	const [warningMessage, setWarningMessage] = useState(null);

	const [loadDefaultValue, setLoadDefaultValue] = useState(false);

	// ==================== function =====================

	const validateEmail = useCallback((address) => {
		const isValidFormatEmail = util.isValidEmailFormat(address);

		if (isValidFormatEmail) setWarningMessage("");
		else setWarningMessage("Sorry, your email address is invalid.");
	}, []);

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
				className={`formControl ${className}`}
				onChange={(e) => validateEmail(e.target.value)}
				required={required}
				autoFocus={autoFocus}
				role="presentation"
				autoComplete={autoComplete ? "" : "off"}
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
