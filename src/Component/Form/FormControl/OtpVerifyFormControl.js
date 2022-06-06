import React, { forwardRef, useCallback, useState } from "react";
import { Form, FormControl } from "react-bootstrap";

function OtpVerifyFormControl(props, ref) {
	const {
		id = "",
		className = "p-3",
		required = true,
		autoFocus = false,
		autoComplete = false,
		withLabel = true,
		size = "7",
		minLength = "7",
		maxLength = "7",
		disabled = false,
	} = props;

	const [cursor, setCursor] = useState();

	const [warningMessage, setWarningMessage] = useState("");

	const formatPhoneNumber = (value = "") => {
		if (value.length < 7) {
			if (value.length === 0) return [value, 0];

			// clean the input for any non-digit values.
			const phoneNumber = value.replace(/[^\d]/g, "");

			// phoneNumberLength is used to know when to apply our formatting for the phone number
			const phoneNumberLength = phoneNumber.length;

			// US format - 10 digits max
			if (phoneNumberLength === 1) {
				return [phoneNumber, phoneNumberLength];
			} else if (phoneNumberLength === 2) {
				return [
					`${phoneNumber.slice(0, 1)} ${phoneNumber.slice(1, 2)}`,
					phoneNumberLength,
				];
			} else if (phoneNumberLength === 3) {
				return [
					`${phoneNumber.slice(0, 1)} ${phoneNumber.slice(
						1,
						2
					)} ${phoneNumber.slice(2, 3)}`,
					phoneNumberLength,
				];
			} else {
				return [
					`${phoneNumber.slice(0, 1)} ${phoneNumber.slice(
						1,
						2
					)} ${phoneNumber.slice(2, 3)} ${phoneNumber.slice(3, 4)}`,
					phoneNumberLength,
				];
			}
		}

		return [];
	};

	const validatePhone = useCallback(
		(phone) => {
			const [formattedPhone, numOfDigits] = formatPhoneNumber(phone);

			if (ref?.current && ref.current.value) {
				ref.current.value = formattedPhone;
			}

			if (numOfDigits === 0 || numOfDigits === 4) {
				setWarningMessage("");
			} else if (numOfDigits < 10) {
				setWarningMessage("Sorry, verification code must have 4-digits!");
			}
		},
		[ref]
	);

	const app = (
		<>
			{withLabel && (
				<Form.Label
					{...(id && { htmlFor: id })}
					className={`fs-5 ${required && "tedkvn-required"} }`}
				>
					OTP Verification Code
				</Form.Label>
			)}

			<FormControl
				{...(id && { id: id })}
				type="text"
				placeholder="_ _ _ _"
				className={`tedkvn-formControl ${className}`}
				ref={ref}
				onChange={(p) => {
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
			{warningMessage && (
				<Form.Text className="text-muted">
					<span className="text-danger">
						Please enter 4-digits verification code!
					</span>
				</Form.Text>
			)}
		</>
	);

	return app;
}

export default forwardRef(OtpVerifyFormControl);
