import React, { useCallback, useEffect, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import hiddenIcon from "../../../Assest/Image/Icon/hidden-icon.png";
import visibilityIcon from "../../../Assest/Image/Icon/visibility-icon.png";
import * as constVar from "../../../Util/ConstVar";
import * as util from "../../../Util/Util";
import IconButton from "../../Button/IconButton";

function ConfirmPasswordFormControl({
	id = "",
	className = "",
	placeholder = "Enter your password again",
	required = false,
	disabled = false,
	passwordChanged = false,
	onConfirmPasswordValidation = () => {},
	sessionStorageObjName = "",
}) {
	const confirmPasswordRef = React.createRef("");

	const [visibility, setVisibility] = useState(false);

	const onConfirmPasswordChangeHandler = useCallback(
		(confirmPassword = "") => {
			const currentPassword =
				util.getSessionStorageObj(sessionStorageObjName)[
					`${constVar.STORAGE_PASSWORD_PROP}`
				] || "";

			const isPasswordMatch = confirmPassword === currentPassword;

			util.saveToSessionStore(
				sessionStorageObjName,
				constVar.STORAGE_CONFIRM_PASSWORD_VALIDATION,
				isPasswordMatch
			);

			// notify and return that confirm password has validated
			onConfirmPasswordValidation(isPasswordMatch);
		},
		[sessionStorageObjName, onConfirmPasswordValidation]
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
