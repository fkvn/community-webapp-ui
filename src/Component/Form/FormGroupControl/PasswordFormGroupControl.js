import React, { useState } from "react";
import { Form } from "react-bootstrap";

function PasswordFromGroupControl({
	id = "",
	withLabel = true,
	label = "Password",
	labelClassName = "",
	formGroupClassName = "",
	required = false,
	disabled = false,
	sessionStorageObjName = "",
	withPasswordFormControl = true,
	RenderFormControl = () => {},
	withConfirmPasswordFormControl = false,
	RenderConfirmFormControl = () => {},
}) {
	const [warningMessage, setWarningMessage] = useState("");

	const [passwordChanged, setPasswordChanged] = useState(false);

	const [confirmPasswordWarningMessage, setConfirmPasswordWarningMessage] =
		useState(false);

	const onPasswordValidationHanlder = (isValidPassword = false) => {
		setPasswordChanged(true);

		if (isValidPassword) setWarningMessage("");
		else
			setWarningMessage(
				"Your password must be between 8 and 20 characters (at least 1 upper, 1 lower, 1 number, and no white space)."
			);
	};

	const onVerifyPasswordValidationHanlder = (isPasswordMatch = false) => {
		setPasswordChanged(false);

		if (isPasswordMatch) setConfirmPasswordWarningMessage("");
		else
			setConfirmPasswordWarningMessage(
				"Password and Confirm Password must be match!"
			);
	};

	const passwordFormControl = withPasswordFormControl && (
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

			<RenderConfirmFormControl
				{...(id && { id: "confirm-" + id })}
				required={true}
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
