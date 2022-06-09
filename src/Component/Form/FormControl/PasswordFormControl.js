import React, { useCallback, useEffect, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import hiddenIcon from "../../../Assest/Image/Icon/hidden-icon.png";
import visibilityIcon from "../../../Assest/Image/Icon/visibility-icon.png";
import * as util from "../../../Util/Util";
import IconButton from "../../Button/IconButton";

function PasswordFormControl({
	id = "",
	className = "",
	placeholder = "Enter password",
	required = false,
	password = "",
	disabled = false,
	onMergeStorageSession = () => {},
	onLoadDefaultValue = () => {},
}) {
	const [visibility, setVisibility] = useState(false);

	const [loading, setLoading] = useState(true);

	const onPasswordChangeHandler = useCallback(
		(password = "") => {
			// validate password
			const isValidPassword = util.isValidPasswordFormat(password);

			// merge to storage session
			onMergeStorageSession(password, isValidPassword);
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
		<InputGroup className="mb-3 mx-0">
			<IconButton
				{...(id && { btnId: id + "hidden-icon" })}
				imgSrc={visibility ? visibilityIcon : hiddenIcon}
				btnVariant="white"
				btnClassName="tedkvn-password-hidden-icon  border"
				onClickHandler={() => setVisibility(!visibility)}
			/>
			<FormControl
				{...(id && { id: id })}
				value={password}
				type={visibility ? "text" : "password"}
				placeholder={placeholder}
				className={`tedkvn-formControl ${className}`}
				required={required}
				autoComplete={"new-password"}
				disabled={disabled}
				onChange={(pwd) => onPasswordChangeHandler(pwd.target.value)}
			/>
		</InputGroup>
	);
	return app;
}

export default PasswordFormControl;
