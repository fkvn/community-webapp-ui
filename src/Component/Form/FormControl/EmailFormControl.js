import React, { useCallback, useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import * as util from "../../../Util/Util";

function EmailFormControl({
	id = "",
	className = "",
	type = "email",
	placeholder = "Enter your email address",
	required = false,
	disabled = false,
	onEmailValidation = () => {},
	onMergeStorageSession = () => {},
	onLoadDefaultValue = () => {},
}) {
	const [loading, setLoading] = useState(true);

	const ref = React.createRef("");

	const onEmailChangeHanlder = useCallback(
		(email) => {
			const isValidEmail = util.isValidEmailFormat(email);

			// merge to storage session
			onMergeStorageSession(email, isValidEmail);

			// notify and return that the email has validated
			onEmailValidation(isValidEmail);
		},
		[onEmailValidation, onMergeStorageSession]
	);

	useEffect(() => {
		// first time load
		if (loading) {
			// load default Value
			const defaultValue = onLoadDefaultValue() || "";

			if (ref.current) {
				ref.current.value = defaultValue;
				onEmailChangeHanlder(ref.current.value);
			}

			setLoading(false);
		}
	}, [loading, setLoading, ref, onEmailChangeHanlder, onLoadDefaultValue]);

	const app = (
		<FormControl
			{...(id && { id: id })}
			ref={ref}
			type={type}
			placeholder={placeholder}
			className={`tedkvn-formControl ${className}`}
			onChange={(e) => onEmailChangeHanlder(e.target.value)}
			required={required}
			role="presentation"
			disabled={disabled}
		/>
	);
	return app;
}

export default EmailFormControl;
