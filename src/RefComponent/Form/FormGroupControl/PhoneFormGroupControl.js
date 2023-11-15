import { useState } from "react";

import * as util from "../../../Util/Util";
import FormGroupControl from "./FormGroupControl";

function PhoneFromGroupControl({
	id = "",
	withLabel = true,
	label = "Phone",
	labelClassName = "",
	formGroupClassName = "",
	required = false,
	displayWaningMessage = true,
	RenderFormControl = () => {},
	renderProps = {},
}) {
	const [warningMessage, setWarningMessage] = useState("");

	const onPhoneValidationHanlder = (formattedPhone = "") => {
		const numOfDigits = util.getNumberOfDigit(formattedPhone);

		const isValidPhone = formattedPhone.length === 0 || numOfDigits === 10;

		if (isValidPhone) setWarningMessage("");
		else setWarningMessage("Please enter a valid phone number");

		return isValidPhone;
	};

	const app = (
		<>
			<FormGroupControl
				{...(id && { id: id })}
				withLabel={withLabel}
				label={label}
				{...(labelClassName && { labelClassName: labelClassName })}
				{...(formGroupClassName && { formGroupClassName: formGroupClassName })}
				required={required}
				displayWaningMessage={displayWaningMessage}
				warningMessage={warningMessage}
				RenderFormControl={RenderFormControl}
				renderProps={renderProps}
				validationProp={{ onPhoneValidation: onPhoneValidationHanlder }}
			/>
		</>
	);
	return app;
}

export default PhoneFromGroupControl;
