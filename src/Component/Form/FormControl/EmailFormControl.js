import React, { useCallback, useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import * as util from "../../../Util/Util";

function EmailFormControl({
	id = "",
	className = "",
	type = "email",
	email = "",
	placeholder = "Enter your email address",
	required = false,
	disabled = false,
	onMergeStorageSession = () => {},
	onLoadDefaultValue = () => {},
}) {
	const [loading, setLoading] = useState(true);

	const onEmailChangeHanlder = useCallback(
		(email) => {
			const isValidEmail = util.isValidEmailFormat(email);

			// merge to storage session
			onMergeStorageSession(email, isValidEmail);
		},
		[onMergeStorageSession]
	);

	useEffect(() => {
		// first time load
		if (loading) {
			// load default Value
			onLoadDefaultValue();

			setLoading(false);
		}
	}, [loading, setLoading, onLoadDefaultValue]);

	const app = (
		<FormControl
			{...(id && { id: id })}
			value={email}
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
