import { useState } from "react";
import OtpFormControlContainer from "../../../Container/FormContainer/FormControlContainer/OtpFormControlContainer.js/OtpFormControlContainer";
import FormGroupControl from "./FormGroupControl";

function OtpVerifyFormGroupControl({
	id = "",
	withLabel = true,
	label = "OTP Verification Code",
	labelClassName = "",
	formGroupClassName = "",
	required = false,
	displayWaningMessage = true,
	storageObjName = "",
}) {
	const [warningMessage, setWarningMessage] = useState("");

	const onOtpValidationHanlder = (isValidOtp = true) => {
		if (isValidOtp) setWarningMessage("");
		else setWarningMessage("Verification code must have 4-digits!");
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
				RenderFormControl={OtpFormControlContainer}
				renderProps={{ storageObjName: storageObjName }}
				validationProp={{ onOtpValidation: onOtpValidationHanlder }}
			/>
		</>
	);
	return app;
}

export default OtpVerifyFormGroupControl;
