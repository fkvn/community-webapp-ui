import React, { useState } from "react";
import { Form } from "react-bootstrap";
import NewPhoneFormControl from "../FormControl/NewPhoneFormControl";

function PhoneFromGroupControl({
	id = "",
	withLabel = true,
	label = "Phone",
	labelClassName = "",
	formGroupClassName = "",
	required = false,
	disabled = false,
	landlineWarning = false,
	displayWaningMessage = true,
	sessionStorageObjName = "",
}) {
	const [warningMessage, setWarningMessage] = useState("");

	const onPhoneValidationHanlder = (isValidPhone = true) => {
		if (isValidPhone) setWarningMessage("");
		else setWarningMessage("Sorry, your phone number is invalid.");
	};

	const app = (
		<Form.Group className={`formGroupControl ${formGroupClassName}`}>
			{withLabel && (
				<Form.Label
					{...(id && { htmlFor: id })}
					className={`formLabel ${labelClassName} ${
						required && "tedkvn-required"
					} }`}
				>
					{label}
				</Form.Label>
			)}

			<NewPhoneFormControl
				{...(id && { id: id })}
				required={required}
				disabled={disabled}
				onPhoneValidation={onPhoneValidationHanlder}
				sessionStorageObjName={sessionStorageObjName}
			/>

			{displayWaningMessage && warningMessage.length > 0 && (
				<Form.Text className="text-muted">
					<span className="text-danger">{warningMessage}</span>
				</Form.Text>
			)}

			{landlineWarning && (
				<Form.Group>
					<Form.Text className="text-mute">
						This phone is for login credential and OTP verification (if any){" "}
						<br />
						<small className="text-danger">
							Please don't use any landline phone number!
						</small>
					</Form.Text>
				</Form.Group>
			)}
		</Form.Group>
	);
	return app;
}

export default PhoneFromGroupControl;
