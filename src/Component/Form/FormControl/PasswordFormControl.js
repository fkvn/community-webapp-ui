import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import hiddenIcon from "../../../Assest/Image/Icon/hidden-icon.png";
import visibilityIcon from "../../../Assest/Image/Icon/visibility-icon.png";
import IconButton from "../../Button/IconButton";

function PasswordFormControl(props, ref) {
	const {
		id = "",
		className = "p-3",
		required = true,
		displayWaningMessage = true,
		withLabel = true,
		attachedverifyPasswordFormControl = false,
		defaultValue = "",
		onChange = () => {},
		onVerifyChange = () => {},
	} = props;

	const [visibility, setVisibility] = useState(false);

	const [warningMessage, setWarningMessage] = useState("");

	const [passwordConfirm, setPasswordConfirm] = useState({
		value: "",
		warningMessage: "",
	});

	const [loadDefaultValue, setLoadDefaultValue] = useState(false);

	const togglePasswordVisibility = () => {
		setVisibility(!visibility);
	};

	const isPasswordMatch = useCallback((verifyPassword, currentPassword) => {
		return verifyPassword === currentPassword;
	}, []);

	const isValidPassword = useCallback((password) => {
		let condition =
			password.length === 0 ||
			/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,20}$/.test(password);

		if (condition) return true;

		return false;
	}, []);

	const validateVerifyPassword = useCallback(
		(verifyPassword, currentPassword) => {
			const validPassword = isPasswordMatch(verifyPassword, currentPassword);

			onVerifyChange(validPassword);

			if (validPassword)
				setPasswordConfirm({ value: verifyPassword, warningMessage: "" });
			else
				setPasswordConfirm({
					value: verifyPassword,
					warningMessage: "Password doesn't match!",
				});
		},
		[isPasswordMatch, onVerifyChange]
	);

	const validatePassword = useCallback(
		(password) => {
			const validPassword = isValidPassword(password);

			onChange(password, validPassword);

			if (validPassword || password === "") setWarningMessage("");
			else
				setWarningMessage(
					"Your password must be between 8 and 20 characters (at least 1 upper, 1 lower, 1 number, and no white space)."
				);

			if (attachedverifyPasswordFormControl) {
				validateVerifyPassword(passwordConfirm.value, password);
			}
		},
		[
			isValidPassword,
			validateVerifyPassword,
			attachedverifyPasswordFormControl,
			onChange,
			passwordConfirm,
		]
	);

	useEffect(() => {
		if (!loadDefaultValue && ref.current) {
			ref.current.value = defaultValue;
			setLoadDefaultValue(true);
			validatePassword(ref.current.value);
		}
	}, [loadDefaultValue, ref, defaultValue, validatePassword]);

	const passwordFormControl = (
		<>
			{withLabel && (
				<Form.Label
					{...(id && { htmlFor: id })}
					className={`fs-5 ${required && "tedkvn-required"} }`}
				>
					Password
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
				<FormControl
					{...(id && { id: id })}
					ref={ref}
					type={visibility ? "text" : "password"}
					placeholder="Enter password"
					className={`formControl ${className}`}
					onChange={(pwd) => validatePassword(pwd.target.value)}
					required={required}
					autoComplete={"new-password"}
				/>
			</InputGroup>

			{displayWaningMessage && warningMessage && (
				<Form.Text className="text-muted">
					<span className="text-danger">{warningMessage}</span>
				</Form.Text>
			)}
		</>
	);

	const verifyPasswordFormControl = attachedverifyPasswordFormControl && (
		<>
			{withLabel && (
				<Form.Label
					{...(id && { htmlFor: "verify-" + id })}
					className={`fs-5 ${required && "tedkvn-required"} }`}
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
					onClickHandler={() => {
						togglePasswordVisibility();
					}}
				/>
				<FormControl
					{...(id && { id: "verify-" + id })}
					type={visibility ? "text" : "password"}
					placeholder="Enter password"
					className={`formControl ${className}`}
					onChange={(pwd) =>
						validateVerifyPassword(pwd.target.value, ref.current.value)
					}
					required={required}
					autoComplete={"new-password"}
				/>
			</InputGroup>

			{passwordConfirm.warningMessage && (
				<Form.Text className="text-muted">
					<span className="text-danger">{passwordConfirm.warningMessage}</span>
				</Form.Text>
			)}
		</>
	);

	const app = (
		<>
			{passwordFormControl} {verifyPasswordFormControl}
		</>
	);
	return app;
}

export default forwardRef(PasswordFormControl);
