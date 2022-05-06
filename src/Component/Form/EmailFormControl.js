import React from "react";
import { forwardRef } from "react";
import { FormControl } from "react-bootstrap";

function EmailFormControl(props, ref) {
	const {
		id = "emailFormControl",
		address = "",
		clName = "",
		required = true,
		validateEmail = () => {},
		autoFocus = false,
	} = props;

	const isValidEmailFormat = (email) => {
		if (
			email.length === 0 ||
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
		) {
			return [email, true];
		} else return [email, false];
	};

	const app = (
		<FormControl
			id={id}
			ref={ref}
			type="email"
			placeholder="Enter email"
			value={address}
			className={clName}
			onChange={(e) => validateEmail(isValidEmailFormat(e.target.value))}
			required={required}
			autoFocus={autoFocus}
		/>
	);

	return app;
}

export default forwardRef(EmailFormControl);
