import React, { useCallback, useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import * as util from "../../../Util/util";

function NewEmailFormControl({
	id = "",
	className = "",
	withLabel = true,
	label = "Email",
	labelClassName = "",
	placeholder = "Enter your email",
	required = true,
	autoFocus = false,
	displayWaningMessage = true,
	getWarningMessage = () => {},
	sessionStorageObjName = "",
	sessionStoragePropName = "email",
	disabled = false,
}) {
	const [warningMessage, setWarningMessage] = useState("");

	const [loading, setLoading] = useState(true);

	const ref = React.createRef("");

	const onEmailChangeHanlder = useCallback(
		(email) => {
			const isValidEmail = util.isValidEmailFormat(email);

			util.saveToSessionStore(
				sessionStorageObjName,
				"isValidEmail",
				isValidEmail
			);
			util.saveToSessionStore(
				sessionStorageObjName,
				sessionStoragePropName,
				email
			);

			if (isValidEmail) setWarningMessage("");
			else setWarningMessage("Sorry, your email address is invalid.");
		},
		[sessionStorageObjName, sessionStoragePropName, setWarningMessage]
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
				onEmailChangeHanlder(ref.current.value);
			}

			setLoading(false);
		}

		getWarningMessage(warningMessage);
	}, [
		loading,
		setLoading,
		ref,
		sessionStorageObjName,
		sessionStoragePropName,
		onEmailChangeHanlder,
		warningMessage,
		getWarningMessage,
	]);

	const app = (
		<>
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
			<FormControl
				{...(id && { id: id })}
				ref={ref}
				type="email"
				placeholder={placeholder}
				className={`formControl ${className}`}
				onChange={(e) => onEmailChangeHanlder(e.target.value)}
				required={required}
				autoFocus={autoFocus}
				role="presentation"
				disabled={disabled}
			/>
			{displayWaningMessage && warningMessage.length > 0 && (
				<Form.Text className="text-muted">
					<span className="text-danger">{warningMessage}</span>
				</Form.Text>
			)}
		</>
	);
	return app;
}

export default NewEmailFormControl;
