import React, { useCallback, useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import * as constVar from "../../../Util/ConstVar";
import * as util from "../../../Util/util";

function NewEmailFormControl({
	id = "",
	className = "",
	type = "email",
	placeholder = "Enter your email",
	required = false,
	disabled = false,
	onEmailValidation = () => {},
	sessionStorageObjName = "",
}) {
	const [loading, setLoading] = useState(true);

	const ref = React.createRef("");

	const onEmailChangeHanlder = useCallback(
		(email) => {
			const isValidEmail = util.isValidEmailFormat(email);

			util.saveToSessionStore(
				sessionStorageObjName,
				constVar.STORAGE_EMAIL_VALIDATION,
				isValidEmail
			);

			util.saveToSessionStore(
				sessionStorageObjName,
				constVar.STORAGE_EMAIL_PROP,
				email
			);

			// notify and return that the email has validated
			onEmailValidation(isValidEmail);
		},
		[sessionStorageObjName, onEmailValidation]
	);

	useEffect(() => {
		// first time load
		if (loading) {
			const defaultValue =
				util.getSessionStorageObj(sessionStorageObjName)[
					`${constVar.STORAGE_EMAIL_PROP}`
				] || "";

			if (ref.current) {
				ref.current.value = defaultValue;
				onEmailChangeHanlder(ref.current.value);
			}

			setLoading(false);
		}
	}, [loading, setLoading, ref, sessionStorageObjName, onEmailChangeHanlder]);

	const app = (
		<FormControl
			{...(id && { id: id })}
			ref={ref}
			type={type}
			placeholder={placeholder}
			className={`formControl ${className}`}
			onChange={(e) => onEmailChangeHanlder(e.target.value)}
			required={required}
			role="presentation"
			disabled={disabled}
		/>
	);
	return app;
}

export default NewEmailFormControl;
