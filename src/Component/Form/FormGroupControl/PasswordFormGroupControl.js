import React, { useState } from "react";
import { Form } from "react-bootstrap";
import ConfirmPasswordFormControl from "../FormControl/ConfirmPasswordFormControl";
import PasswordFormControl from "../FormControl/PasswordFormControl";

function PasswordFromGroupControl({
	id = "",
	withLabel = true,
	label = "Password",
	labelClassName = "",
	formGroupClassName = "",
	required = false,
	disabled = false,
	sessionStorageObjName = "",
	withConfirmPasswordFormControl = false,
}) {
	const [warningMessage, setWarningMessage] = useState("");

	const [passwordChanged, setPasswordChanged] = useState(false);

	const [confirmPasswordWarningMessage, setConfirmPasswordWarningMessage] =
		useState(false);

	const onPasswordValidationHanlder = (isValidPassword = true) => {
		setPasswordChanged(true);

		if (isValidPassword) setWarningMessage("");
		else
			setWarningMessage(
				"Your password must be between 8 and 20 characters (at least 1 upper, 1 lower, 1 number, and no white space)."
			);
	};

	const onVerifyPasswordValidationHanlder = (isPasswordMatch = true) => {
		setPasswordChanged(false);

		if (isPasswordMatch) setConfirmPasswordWarningMessage("");
		else
			setConfirmPasswordWarningMessage(
				"Password and Confirm Password must be match!"
			);
	};

	const passwordFormControl = (
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
			<PasswordFormControl
				{...(id && { id: id })}
				required={required}
				disabled={disabled}
				onPasswordValidation={onPasswordValidationHanlder}
				sessionStorageObjName={sessionStorageObjName}
			/>

			{warningMessage.length > 0 && (
				<Form.Text className="text-muted">
					<span className="text-danger">{warningMessage}</span>
				</Form.Text>
			)}
		</Form.Group>
	);

	const confirmPasswordFormControl = withConfirmPasswordFormControl && (
		<Form.Group className={`tedkvn-formGroupControl ${formGroupClassName}`}>
			{withLabel && (
				<Form.Label
					{...(id && { htmlFor: "confirm-" + id })}
					className={`formLabel ${labelClassName} ${
						required && "tedkvn-required"
					} }`}
				>
					Confirm Password
				</Form.Label>
			)}

			<ConfirmPasswordFormControl
				{...(id && { id: "confirm-" + id })}
				required={required}
				disabled={disabled}
				passwordChanged={passwordChanged}
				onConfirmPasswordValidation={onVerifyPasswordValidationHanlder}
				sessionStorageObjName={sessionStorageObjName}
			/>

			{confirmPasswordWarningMessage.length > 0 && (
				<Form.Text className="text-muted">
					<span className="text-danger">{confirmPasswordWarningMessage}</span>
				</Form.Text>
			)}
		</Form.Group>
	);

	const app = (
		<>
			{passwordFormControl}
			{confirmPasswordFormControl}
		</>
	);
	return app;
}

export default PasswordFromGroupControl;
