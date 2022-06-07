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
	disabled = false,
	onPasswordValidation = () => {},
	onMergeStorageSession = () => {},
	onLoadDefaultValue = () => {},
}) {
	const [visibility, setVisibility] = useState(false);

	const [loading, setLoading] = useState(true);

	const ref = React.createRef("");

	const onPasswordChangeHandler = useCallback(
		(password = "") => {
			const isValidPassword = util.isValidPasswordFormat(password);

			// merge to storage session
			onMergeStorageSession(password, isValidPassword);

			// notify and return that password has validated
			onPasswordValidation(isValidPassword);
		},
		[onMergeStorageSession, onPasswordValidation]
	);

	useEffect(() => {
		// first time load
		if (loading) {
			// load default Value
			const defaultValue = onLoadDefaultValue() || "";

			if (ref.current) {
				ref.current.value = defaultValue;
				onPasswordChangeHandler(ref.current.value);
			}

			setLoading(false);
		}
	}, [loading, setLoading, onLoadDefaultValue, ref, onPasswordChangeHandler]);

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
				ref={ref}
				type={visibility ? "text" : "password"}
				placeholder={placeholder}
				className={`tedkvn-formControl ${className}`}
				onChange={(pwd) => onPasswordChangeHandler(pwd.target.value)}
				required={required}
				autoComplete={"new-password"}
				disabled={disabled}
			/>
		</InputGroup>
	);
	return app;
}

export default PasswordFormControl;
