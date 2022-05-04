import React from "react";
import { useState } from "react";
import { InputGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";

import hiddenIcon from "../../Assest/Image/Icon/hidden.png";
import visibilityIcon from "../../Assest/Image/Icon/visibility.png";
import IconButton from "../Button/IconButton";

function PasswordFormControl({
	value = "",
	clName = "",
	required = true,
	validatePassword = () => {},
}) {
	const [visibility, setVisibility] = useState(false);

	const isValidPassword = (password) => {
		if (
			password.length === 0 ||
			/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,20}$/.test(password)
		) {
			return [password, true];
		} else return [password, false];
	};

	const togglePasswordVisibility = () => {
		setVisibility(!visibility);
	};

	const passwordFormControl = (
		<FormControl
			id="passwordFormControl"
			type={visibility ? "text" : "password"}
			placeholder="Enter password"
			value={value}
			className={clName}
			onChange={(pwd) => validatePassword(isValidPassword(pwd.target.value))}
			required={required}
		/>
	);

	const app = (
		<InputGroup className="mb-3 mx-0">
			<IconButton
				imgSrc={visibility ? visibilityIcon : hiddenIcon}
				btnId="password-hidden-icon"
				btnVariant="white"
				btnClassName="border"
				onClickHandler={() => {
					togglePasswordVisibility();
				}}
			/>
			{passwordFormControl}
		</InputGroup>
	);

	return app;
}

export default PasswordFormControl;
