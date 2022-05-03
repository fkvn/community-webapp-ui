import React from "react";
import { FormControl } from "react-bootstrap";

function PhoneFormControl({
	number = "",
	size = "16",
	minLength = "16",
	maxLength = "16",
	required = true,
	validatePhone = () => {},
}) {
	const formatPhoneNumber = (value) => {
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

	const app = (
		<FormControl
			id="phoneFormControl"
			type="tel"
			placeholder="(___) ___-____"
			className="p-3"
			value={number}
			onChange={(p) => validatePhone(formatPhoneNumber(p.target.value))}
			size={size}
			minLength={minLength}
			maxLength={maxLength}
			required={required}
		/>
	);

	return app;
}

export default PhoneFormControl;
