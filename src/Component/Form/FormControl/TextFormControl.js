import React, { forwardRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Form } from "react-bootstrap";

function TextFormControl(props, ref) {
	// ==================== config =====================

	const {
		id = "",
		withLabel = false,
		labelTitle = "",
		placeholder = "",
		className = "p-3",
		required = false,
		autoFocus = false,
		autoComplete = false,
		defaultValue = "",
		onChange = () => {},
	} = props;

	const [loadDefaultValue, setLoadDefaultValue] = useState(false);

	// ==================== hook =====================

	useEffect(() => {
		if (!loadDefaultValue && ref.current) {
			ref.current.value = defaultValue;
			setLoadDefaultValue(true);
		}
	}, [loadDefaultValue, ref, defaultValue]);

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
				type="text"
				className={`formControl ${className}`}
				placeholder={placeholder}
				required={required}
				autoFocus={autoFocus}
				autoComplete={autoComplete ? "" : "off"}
				onChange={onChange}
			/>
		</>
	);

	// ==================== render =====================

	return app;
}

// forward ref component
export default forwardRef(TextFormControl);
