import { useCallback, useEffect, useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import hiddenIcon from "../../../Assest/Image/Icon/hidden-icon.png";
import visibilityIcon from "../../../Assest/Image/Icon/visibility-icon.png";
import IconButton from "../../Button/IconButton";

function PasswordFormControl({
	id = "",
	className = "",
	placeholder = "Enter password",
	required = false,
	password = "",
	disabled = false,
	autocomplete = false,
	onMergeStorage = () => {},
	onLoadDefaultValue = () => {},
}) {
	const [visibility, setVisibility] = useState(false);

	const [loading, setLoading] = useState(true);

	const onPasswordChangeHandler = useCallback(
		(password = "") => {
			// merge to storage session
			onMergeStorage(password);
		},
		[onMergeStorage]
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

			{!autocomplete && (
				<Form.Group>
					{/* this form group is to prevent the autocomplete */}
					<FormControl
						type={"text"}
						style={{
							display: "inline-block",
							opacity: "0",
							position: "absolute",
							overflow: "hidden",
							maxHeight: "0",
							maxWidth: "0",
						}}
					/>
				</Form.Group>
			)}
			<FormControl
				{...(id && { id: id })}
				value={password}
				type={visibility ? "text" : "password"}
				placeholder={placeholder}
				className={`tedkvn-formControl ${className}`}
				required={required}
				autoComplete="new-password"
				disabled={disabled}
				onChange={(pwd) => onPasswordChangeHandler(pwd.target.value)}
			/>
		</InputGroup>
	);
	return app;
}

export default PasswordFormControl;
