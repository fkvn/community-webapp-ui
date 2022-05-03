import React from "react";
import { FormControl } from "react-bootstrap";

function EmailFormControl({
	address = "",
	clName = "",
	required = true,
	validateEmail = () => {},
}) {
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
			id="emailFormControl"
			type="email"
			placeholder="Enter email"
			value={address}
			className={clName}
			onChange={(e) => validateEmail(isValidEmailFormat(e.target.value))}
			required={required}
		/>
	);

	return app;
}

export default EmailFormControl;
