import { useState } from "react";

import * as util from "../../../Util/Util";
import FormGroupControl from "./FormGroupControl";

function PasswordFromGroupControl({
	id = "",
	withLabel = true,
	label = "Password",
	labelClassName = "",
	placeholder = "",
	formGroupClassName = "",
	required = false,
	displayWaningMessage = true,
	withPasswordFormControl = true,
	RenderFormControl = () => {},
	renderProps = {},
	displayConfirmWaningMessage = true,
	withConfirmPasswordFormControl = false,
	RenderConfirmFormControl = () => {},
	withIcon = false,
	iconSrc = "",
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
				"8 to 20 characters (1 upper, 1 lower, 1 number, and no white space)."
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
		<FormGroupControl
			{...(id && { id: id })}
			withLabel={withLabel}
			label={label}
			{...(labelClassName && { labelClassName: labelClassName })}
			{...(formGroupClassName && { formGroupClassName: formGroupClassName })}
			{...(placeholder && { placeholder: placeholder })}
			required={required}
			withIcon={withIcon}
			iconSrc={iconSrc}
			displayWaningMessage={displayWaningMessage}
			warningMessage={warningMessage}
			RenderFormControl={RenderFormControl}
			renderProps={renderProps}
			validationProp={{ onPasswordValidation: onPasswordValidationHanlder }}
		/>
	);

	const confirmPasswordFormControl = withConfirmPasswordFormControl && (
		<FormGroupControl
			{...(id && { id: id })}
			withLabel={withLabel}
			label={label}
			{...(labelClassName && { labelClassName: labelClassName })}
			{...(formGroupClassName && { formGroupClassName: formGroupClassName })}
			placeholder={placeholder}
			required={required}
			withIcon={withIcon}
			iconSrc={iconSrc}
			displayWaningMessage={displayConfirmWaningMessage}
			warningMessage={confirmPasswordWarningMessage}
			RenderFormControl={RenderConfirmFormControl}
			renderProps={{ passwordChanged: passwordChanged }}
			validationProp={{
				onConfirmPasswordValidation: onVerifyPasswordValidationHanlder,
			}}
		/>
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
