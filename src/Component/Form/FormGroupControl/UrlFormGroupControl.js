import { useState } from "react";
import { Form, Row } from "react-bootstrap";

import * as util from "../../../Util/Util";

function UrlFormGroupControl({
	id = "",
	withLabel = true,
	label = "Website",
	labelClassName = "",
	placeholder = "",
	formGroupClassName = "",
	required = false,
	disabled = false,
	displayWaningMessage = true,
	storageObjName = "",
	RenderFormControl = () => {},
}) {
	const [warningMessage, setWarningMessage] = useState("");

	const onUrlValidationHanlder = (url = "") => {
		const isValidUrl = util.isValidUrl(url);

		if (isValidUrl) setWarningMessage("");
		else setWarningMessage("Please  a valid domain with http(s)");

		return isValidUrl;
	};

	const app = (
		<Row>
			<Form.Group className={`tedkvn-formGroupControl ${formGroupClassName}`}>
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
				<RenderFormControl
					{...(id && { id: id })}
					{...(placeholder && { placeholder: placeholder })}
					required={required}
					disabled={disabled}
					onUrlValidation={onUrlValidationHanlder}
					storageObjName={storageObjName}
				/>
				{displayWaningMessage && warningMessage.length > 0 && (
					<Form.Text className="text-muted">
						<span className="text-danger">{warningMessage}</span>
					</Form.Text>
				)}
			</Form.Group>
		</Row>
	);
	return app;
}

export default UrlFormGroupControl;
