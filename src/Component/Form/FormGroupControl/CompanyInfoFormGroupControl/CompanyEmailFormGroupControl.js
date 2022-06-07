import React, { useState } from "react";
import { Form, Row } from "react-bootstrap";

function CompanyEmailFormGroupControl({
	id = "",
	withLabel = true,
	label = "Email",
	labelClassName = "",
	formGroupClassName = "",
	required = false,
	disabled = false,
	displayWaningMessage = true,
	sessionStorageObjName = "",
}) {
	const [warningMessage, setWarningMessage] = useState("");

	const onEmailValidationHanlder = (isValidEmail = true) => {
		if (isValidEmail) setWarningMessage("");
		else setWarningMessage("Please enter a valid email address.");
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
				<CompanyEmailFormGroupControl
					{...(id && { id: id })}
					required={required}
					disabled={disabled}
					onEmailValidation={onEmailValidationHanlder}
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

export default CompanyEmailFormGroupControl;
