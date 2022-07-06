import { useState } from "react";

import * as util from "../../../Util/Util";
import FormGroupControl from "./FormGroupControl";

function EmailFromGroupControl({
	id = "",
	withLabel = true,
	label = "Email Address",
	labelClassName = "",
	placeholder = "",
	formGroupClassName = "",
	required = false,
	displayWaningMessage = true,
	RenderFormControl = () => {},
	renderProps = {},
	withIcon = false,
	iconSrc = "",
}) {
	const [warningMessage, setWarningMessage] = useState("");

	const onEmailValidationHanlder = (email = "") => {
		const isValidEmail = util.isValidEmailFormat(email);

		if (isValidEmail) setWarningMessage("");
		else setWarningMessage("Please enter a valid email address.");

		return isValidEmail;
	};

	const app = (
		<>
			<FormGroupControl
				{...(id && { id: id })}
				withLabel={withLabel}
				label={label}
				{...(labelClassName && { labelClassName: labelClassName })}
				{...(formGroupClassName && { formGroupClassName: formGroupClassName })}
				{...(placeholder && { placeholder: placeholder })}
				required={required}
				withIcon={withIcon}
				iconSrc={iconSrc}
				displayWaningMessage={displayWaningMessage}
				warningMessage={warningMessage}
				RenderFormControl={RenderFormControl}
				renderProps={renderProps}
				validationProp={{ onEmailValidation: onEmailValidationHanlder }}
			/>
		</>
	);
	return app;
}

export default EmailFromGroupControl;
