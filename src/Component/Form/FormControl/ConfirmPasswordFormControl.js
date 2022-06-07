import React, { useCallback, useEffect, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import hiddenIcon from "../../../Assest/Image/Icon/hidden-icon.png";
import visibilityIcon from "../../../Assest/Image/Icon/visibility-icon.png";
import IconButton from "../../Button/IconButton";

function ConfirmPasswordFormControl({
	id = "",
	className = "",
	placeholder = "Enter your password again",
	required = false,
	disabled = false,
	passwordChanged = false,
	onConfirmPasswordValidation = () => {},
	onGetCurrentPassword = () => {},
	onMergeStorageSession = () => {},
}) {
	const confirmPasswordRef = React.createRef("");

	const [visibility, setVisibility] = useState(false);

	const onConfirmPasswordChangeHandler = useCallback(
		(confirmPassword = "") => {
			const currentPassword = onGetCurrentPassword() || "";

			const isPasswordMatch = confirmPassword === currentPassword;

			// merge to storage session
			onMergeStorageSession(isPasswordMatch);

			// notify and return that confirm password has validated
			onConfirmPasswordValidation(isPasswordMatch);
		},
		[onConfirmPasswordValidation, onGetCurrentPassword, onMergeStorageSession]
	);

	useEffect(() => {
		// validate the confirmation password
		if (passwordChanged && confirmPasswordRef.current) {
			const confirmPassword = confirmPasswordRef.current.value || "";
			onConfirmPasswordChangeHandler(confirmPassword);
		}
	});

	const app = (
		<InputGroup className="mb-3 mx-0">
			<IconButton
				{...(id && { btnId: "confirm-" + id + "-hidden-icon" })}
				imgSrc={visibility ? visibilityIcon : hiddenIcon}
				btnVariant="white"
				btnClassName="tedkvn-password-hidden-icon  border"
				onClickHandler={() => setVisibility(!visibility)}
			/>
			<FormControl
				{...(id && { id: id })}
				type={visibility ? "text" : "password"}
				className={`tedkvn-formControl ${className}`}
				placeholder={placeholder}
				ref={confirmPasswordRef}
				required={required}
				disabled={disabled}
				autoComplete={"new-password"}
				onChange={(pwd) => onConfirmPasswordChangeHandler(pwd.target.value)}
			/>
		</InputGroup>
	);
	return app;
}

export default ConfirmPasswordFormControl;
