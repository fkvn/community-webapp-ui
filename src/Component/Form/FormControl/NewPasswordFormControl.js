import React, { useCallback, useEffect, useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import hiddenIcon from "../../../Assest/Image/Icon/hidden-icon.png";
import visibilityIcon from "../../../Assest/Image/Icon/visibility-icon.png";
import * as util from "../../../Util/util";
import IconButton from "../../Button/IconButton";

function NewPasswordFormControl({
	id = "",
	className = "",
	withLabel = true,
	label = "Password",
	labelClassName = "",
	placeholder = "Enter password",
	required = true,
	withVerifyPasswordFormControl = false,
	sessionStorageObjName = "",
	sessionStoragePropName = "password",
	formGroupClassName = "",
	disabled = false,
}) {
	const [warningMessage, setWarningMessage] = useState("");

	const [verifyWarningMessage, setVerifyWarningMessage] = useState("");

	const [visibility, setVisibility] = useState(false);

	const [loading, setLoading] = useState(true);

	const ref = React.createRef("");

	const verifyRef = React.createRef("");

	const onVerifyPasswordChangeHandler = useCallback(
		(verifyPassword = "", currentPassword = ref?.current.value || "") => {
			const isValidVerifyPassword = verifyPassword === currentPassword;

			util.saveToSessionStore(
				sessionStorageObjName,
				"isPasswordMatch",
				isValidVerifyPassword
			);

			if (isValidVerifyPassword) setVerifyWarningMessage("");
			else setVerifyWarningMessage("Password doesn't match!");
		},
		[ref, sessionStorageObjName]
	);

	const onPasswordChangeHandler = useCallback(
		(password = "") => {
			const isValidPassword = util.isValidPasswordFormat(password);

			util.saveToSessionStore(
				sessionStorageObjName,
				sessionStoragePropName,
				password
			);

			util.saveToSessionStore(
				sessionStorageObjName,
				"isValidPassword",
				isValidPassword
			);

			if (withVerifyPasswordFormControl) {
				onVerifyPasswordChangeHandler(verifyRef?.current.value || "", password);
			}

			if (isValidPassword) setWarningMessage("");
			else
				setWarningMessage(
					"Your password must be between 8 and 20 characters (at least 1 upper, 1 lower, 1 number, and no white space)."
				);
		},
		[
			onVerifyPasswordChangeHandler,
			sessionStorageObjName,
			sessionStoragePropName,
			verifyRef,
			withVerifyPasswordFormControl,
		]
	);

	useEffect(() => {
		// first time load
		if (loading) {
			const defaultValue =
				util.getSessionStorageObj(sessionStorageObjName)[
					`${sessionStoragePropName}`
				] || "";

			if (ref.current) {
				ref.current.value = defaultValue;
				onPasswordChangeHandler(ref.current.value);
			}

			setLoading(false);
		}
	}, [
		loading,
		setLoading,
		sessionStorageObjName,
		sessionStoragePropName,
		ref,
		onPasswordChangeHandler,
	]);

	const passwordFormControl = (
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
			<InputGroup className="mb-3 mx-0">
				<IconButton
					{...(id && { btnId: id + "hidden-icon" })}
					imgSrc={visibility ? visibilityIcon : hiddenIcon}
					btnVariant="white"
					btnClassName="password-hidden-icon border"
					onClickHandler={() => setVisibility(!visibility)}
				/>
				<FormControl
					{...(id && { id: id })}
					ref={ref}
					type={visibility ? "text" : "password"}
					placeholder={placeholder}
					className={`formControl ${className}`}
					onChange={(pwd) => onPasswordChangeHandler(pwd.target.value)}
					required={required}
					autoComplete={"new-password"}
					disabled={disabled}
				/>
			</InputGroup>

			{warningMessage.length > 0 && (
				<Form.Text className="text-muted">
					<span className="text-danger">{warningMessage}</span>
				</Form.Text>
			)}
		</Form.Group>
	);

	const verifyPasswordFormControl = withVerifyPasswordFormControl && (
		<Form.Group className={`formGroupControl ${formGroupClassName}`}>
			{withLabel && (
				<Form.Label
					{...(id && { htmlFor: "verify-" + id })}
					className={`formLabel ${labelClassName} ${
						required && "tedkvn-required"
					} }`}
				>
					Password Confirmation
				</Form.Label>
			)}
			<InputGroup className="mb-3 mx-0">
				<IconButton
					{...(id && { btnId: "verify-" + id + "hidden-icon" })}
					imgSrc={visibility ? visibilityIcon : hiddenIcon}
					btnVariant="white"
					btnClassName="password-hidden-icon border"
					onClickHandler={() => setVisibility(!visibility)}
				/>
				<FormControl
					{...(id && { id: "verify-" + id })}
					type={visibility ? "text" : "password"}
					placeholder="Enter password"
					ref={verifyRef}
					className={`formControl ${className}`}
					onChange={(pwd) => onVerifyPasswordChangeHandler(pwd.target.value)}
					required={required}
					autoComplete={"new-password"}
				/>
			</InputGroup>

			{verifyWarningMessage.length > 0 && (
				<Form.Text className="text-muted">
					<span className="text-danger">{verifyWarningMessage}</span>
				</Form.Text>
			)}
		</Form.Group>
	);

	const app = (
		<>
			{passwordFormControl}
			{verifyPasswordFormControl}
		</>
	);
	return app;
}

export default NewPasswordFormControl;
