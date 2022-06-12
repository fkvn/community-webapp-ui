import { useState } from "react";
import { Form } from "react-bootstrap";

import * as util from "../../../Util/Util";

function PasswordFromGroupControl({
	id = "",
	withLabel = true,
	label = "Password",
	labelClassName = "",
	formGroupClassName = "",
	required = false,
	disabled = false,
	storageObjName = "",
	withPasswordFormControl = true,
	RenderFormControl = () => {},
	withConfirmPasswordFormControl = false,
	RenderConfirmFormControl = () => {},
}) {
	const [warningMessage, setWarningMessage] = useState("");

	const [passwordChanged, setPasswordChanged] = useState(false);

	const [confirmPasswordWarningMessage, setConfirmPasswordWarningMessage] =
		useState(false);

	const onPasswordValidationHanlder = (password = "") => {
		const isValidPassword = util.isValidPasswordFormat(password);

		setPasswordChanged(true);

		if (isValidPassword) setWarningMessage("");
		else
			setWarningMessage(
				"8 to 20 characters (at least 1 upper, 1 lower, 1 number, and no white space)."
			);

		return isValidPassword;
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
				storageObjName={storageObjName}
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
				storageObjName={storageObjName}
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
