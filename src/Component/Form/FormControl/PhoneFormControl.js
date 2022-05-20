import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { forwardRef } from "react";
import { Form } from "react-bootstrap";
import { FormControl } from "react-bootstrap";

function PhoneFormControl(props, ref) {
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
		size = "14",
		minLength = "14",
		maxLength = "14",
		defaultValue = "",
		disabled = false,
		onChange = () => {},
	} = props;

	const [warningMessage, setWarningMessage] = useState("");

	const [loadDefaultValue, setLoadDefaultValue] = useState(false);

	const [cursor, setCursor] = useState();

	// ==================== function =====================

	const formatPhoneNumber = (value = "") => {
		if (value.length < 16) {
			if (value.length === 0) return [value, 0];

			// clean the input for any non-digit values.
			const phoneNumber = value.replace(/[^\d]/g, "");

			// phoneNumberLength is used to know when to apply our formatting for the phone number
			const phoneNumberLength = phoneNumber.length;

			// US format - 10 digits max
			if (phoneNumberLength < 11) {
				// digits 0-4
				if (phoneNumberLength < 4)
					return ["(" + phoneNumber, phoneNumberLength];
				// digits 4-6
				else if (phoneNumberLength < 7) {
					return [
						`(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`,
						phoneNumberLength,
					];
				}

				// digits 7-10
				else {
					return [
						`(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
							3,
							6
						)}-${phoneNumber.slice(6, 10)}`,
						phoneNumberLength,
					];
				}
			}
		}

		return [];
	};

	const validatePhone = useCallback(
		(phone) => {
			const [formattedPhone, numOfDigits] = formatPhoneNumber(phone);

			onChange(formattedPhone, numOfDigits === 10 || numOfDigits === 0);

			if (ref?.current && ref.current.value) {
				ref.current.value = formattedPhone;
			}

			if (numOfDigits === 0 || numOfDigits === 10) {
				setWarningMessage("");
			} else if (numOfDigits < 10) {
				setWarningMessage("Sorry, Invalid Phone Number.");
			}
		},
		[ref, onChange]
	);

	const updateCursorPostion = useCallback(() => {
		const input = ref.current;

		let updatedCursor = cursor;

		if (updatedCursor === 1 || updatedCursor === 10) updatedCursor += 1;

		if (updatedCursor === 5) updatedCursor += 2;

		if (input) input.setSelectionRange(updatedCursor, updatedCursor);
	}, [ref, cursor]);

	// ==================== hook =====================

	useEffect(() => {
		if (!loadDefaultValue && ref.current) {
			ref.current.value = defaultValue;
			setLoadDefaultValue(true);
			validatePhone(defaultValue);
		}

		updateCursorPostion();

		getWarningMessage(warningMessage);
	}, [
		loadDefaultValue,
		ref,
		updateCursorPostion,
		getWarningMessage,
		warningMessage,
		defaultValue,
		validatePhone,
	]);

	// ==================== component =====================

	const app = (
		<>
			{withLabel && (
				<Form.Label
					{...(id && { htmlFor: id })}
					className={`fs-5 ${required && "tedkvn-required"} }`}
				>
					Phone
				</Form.Label>
			)}
			<FormControl
				{...(id && { id: id })}
				type="tel"
				placeholder="(___) ___-____"
				className={`formControl ${className}`}
				ref={ref}
				onChange={(p) => {
					setCursor(p.currentTarget.selectionStart);
					validatePhone(p.target.value);
				}}
				size={size}
				minLength={minLength}
				maxLength={maxLength}
				required={required}
				autoFocus={autoFocus}
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
export default forwardRef(PhoneFormControl);
