import React, { useState } from "react";
import { Form, Row } from "react-bootstrap";
import OtpVerifyFormControl from "../FormControl/OtpVerifyFormControl";

function OtpVerifyFormGroupControl({
	id = "",
	withLabel = true,
	label = "OTP Verification Code",
	labelClassName = "",
	formGroupClassName = "",
	required = false,
	disabled = false,
	displayWaningMessage = true,
	sessionStorageObjName = "",
}) {
	const [warningMessage, setWarningMessage] = useState("");

	const onOtpValidationHanlder = (isValidOtp = true) => {
		if (isValidOtp) setWarningMessage("");
		else setWarningMessage("Verification code must have 4-digits!");
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

				<OtpVerifyFormControl
					{...(id && { id: id })}
					required={required}
					disabled={disabled}
					onOtpValidation={onOtpValidationHanlder}
					sessionStorageObjName={sessionStorageObjName}
				/>

				{displayWaningMessage && warningMessage.length > 0 && (
					<Form.Text className="text-muted">
						<span className="text-danger">{warningMessage}</span>
					</Form.Text>
				)}
			</Form.Group>
		</Row>
	);
	return app;
}

export default OtpVerifyFormGroupControl;
