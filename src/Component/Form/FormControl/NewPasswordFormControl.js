import React, { useCallback, useEffect, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import hiddenIcon from "../../../Assest/Image/Icon/hidden-icon.png";
import visibilityIcon from "../../../Assest/Image/Icon/visibility-icon.png";
import * as constVar from "../../../Util/ConstVar";
import * as util from "../../../Util/util";
import IconButton from "../../Button/IconButton";

function NewPasswordFormControl({
	id = "",
	className = "",
	placeholder = "Enter password",
	required = false,
	disabled = false,
	onPasswordValidation = () => {},
	sessionStorageObjName = "",
}) {
	const [visibility, setVisibility] = useState(false);

	const [loading, setLoading] = useState(true);

	const ref = React.createRef("");

	const onPasswordChangeHandler = useCallback(
		(password = "") => {
			const isValidPassword = util.isValidPasswordFormat(password);

			util.saveToSessionStore(
				sessionStorageObjName,
				constVar.STORAGE_PASSWORD_PROP,
				password
			);

			util.saveToSessionStore(
				sessionStorageObjName,
				constVar.STORAGE_PASSWORD_VALIDATION,
				isValidPassword
			);

			// notify and return that password has validated
			onPasswordValidation(isValidPassword);
		},
		[sessionStorageObjName]
	);

	useEffect(() => {
		// first time load
		if (loading) {
			const defaultValue =
				util.getSessionStorageObj(sessionStorageObjName)[
					`${constVar.STORAGE_PASSWORD_PROP}`
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
		ref,
		onPasswordChangeHandler,
	]);

	const app = (
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
	);
	return app;
}

export default NewPasswordFormControl;
