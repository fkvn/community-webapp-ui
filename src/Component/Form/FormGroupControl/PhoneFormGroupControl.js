import { useState } from "react";
import { Form, Row } from "react-bootstrap";

import * as util from "../../../Util/Util";

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
	storageObjName = "",
	RenderFormControl = () => {},
}) {
	const [warningMessage, setWarningMessage] = useState("");

	const onPhoneValidationHanlder = (formattedPhone = "") => {
		const numOfDigits = util.getNumberOfDigit(formattedPhone);

		const isValidPhone = numOfDigits === 10 || numOfDigits === 0;

		if (isValidPhone) setWarningMessage("");
		else setWarningMessage("Please enter a valid phone number");

		return isValidPhone;
	};

	const app = (
		<Row>
			<Form.Group className={`tedkvn-formGroupControl ${formGroupClassName}`}>
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

				<RenderFormControl
					{...(id && { id: id })}
					required={required}
					disabled={disabled}
					onPhoneValidation={onPhoneValidationHanlder}
					storageObjName={storageObjName}
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
		</Row>
	);
	return app;
}

export default PhoneFromGroupControl;
