import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { forwardRef } from "react";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";

import hiddenIcon from "../../Assest/Image/Icon/hidden.png";
import visibilityIcon from "../../Assest/Image/Icon/visibility.png";
import IconButton from "../Button/IconButton";

function PasswordFormControl(props, ref) {
	// ==================== config =====================

	const {
		id = "",
		className = "p-3",
		required = true,
		displayWaningMessage = true,
		withLabel = true,
		autoComplete = false,
		verifyPasswordFormControl = false,
		defaultValue = "",
	} = props;

	const [visibility, setVisibility] = useState(false);

	const [warningMessage, setWarningMessage] = useState("");

	const [loadDefaultValue, setLoadDefaultValue] = useState(false);

	// ==================== function =====================

	const isValidPassword = useCallback(
		(password) => {
			let condition =
				password.length === 0 ||
				/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,20}$/.test(password);

			if (verifyPasswordFormControl) {
				condition = password === ref?.current?.value;
			}

			if (condition) return true;

			return false;
		},
		[ref, verifyPasswordFormControl]
	);

	const validatePassword = useCallback(
		(password) => {
			const validPassord = isValidPassword(password);

			if (validPassord || password === "") setWarningMessage("");
			else
				setWarningMessage(
					verifyPasswordFormControl
						? "Password doesn't match!"
						: "Your password must be between 8 and 20 characters (at least 1 upper, 1 lower, 1 number, and no white space)."
				);
		},
		[isValidPassword, verifyPasswordFormControl]
	);

	const togglePasswordVisibility = () => {
		setVisibility(!visibility);
	};

	useEffect(() => {
		if (!loadDefaultValue && ref.current && !verifyPasswordFormControl) {
			ref.current.value = defaultValue;
			setLoadDefaultValue(true);
			validatePassword(defaultValue);
		}
	}, [
		loadDefaultValue,
		ref,
		verifyPasswordFormControl,
		defaultValue,
		validatePassword,
	]);

	// ==================== component =====================

	const passwordFormControl = (
		<FormControl
			{...(id && { id: id })}
			{...(!verifyPasswordFormControl && { ref: ref })}
			type={visibility ? "text" : "password"}
			placeholder="Enter password"
			className={`formControl ${className}`}
			onChange={(pwd) => validatePassword(pwd.target.value)}
			required={required}
			autoComplete={autoComplete ? "" : "new-password"}
		/>
	);

	const app = (
		<>
			{withLabel && (
				<Form.Label
					{...(id && { htmlFor: id })}
					className={`fs-5 ${required && "tedkvn-required"} }`}
				>
					Password {verifyPasswordFormControl && "Confirmation"}
				</Form.Label>
			)}
			<InputGroup className="mb-3 mx-0">
				<IconButton
					{...(id && { btnId: id + "hidden-icon" })}
					imgSrc={visibility ? visibilityIcon : hiddenIcon}
					btnVariant="white"
					btnClassName="password-hidden-icon border"
					onClickHandler={() => {
						togglePasswordVisibility();
					}}
				/>
				{passwordFormControl}
			</InputGroup>

			{displayWaningMessage && warningMessage && (
				<Form.Text className="text-muted">
					<span className="text-danger">{warningMessage}</span>
				</Form.Text>
			)}
		</>
	);

	// ==================== render =====================

	return app;
}

export default forwardRef(PasswordFormControl);
