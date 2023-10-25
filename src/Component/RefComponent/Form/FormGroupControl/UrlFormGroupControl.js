import { useState } from "react";

import * as util from "../../../Util/Util";
import FormGroupControl from "./FormGroupControl";

function UrlFormGroupControl({
	id = "",
	withLabel = true,
	label = "Website",
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
	const [warningMessage] = useState(
		"Please provide a valid domain with http(s)://"
	);

	const onUrlValidationHanlder = (url = "") => {
		const isValidUrl = util.isValidUrl(url);

		// if (isValidUrl) setWarningMessage("");
		// else setWarningMessage("Please a valid domain with http(s)");

		return isValidUrl;
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
				validationProp={{ onUrlValidation: onUrlValidationHanlder }}
			/>
		</>
	);
	return app;
}

export default UrlFormGroupControl;
