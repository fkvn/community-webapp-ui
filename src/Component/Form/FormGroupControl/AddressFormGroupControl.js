import { useState } from "react";
import FormGroupControl from "./FormGroupControl";

import * as asset from "../../../Assest/Asset";
import * as constVar from "../../../Util/ConstVar";

function AddressFromGroupControl({
	id = "",
	withLabel = false,
	label = "Address",
	labelClassName = "",
	formGroupClassName = "",
	placeholder = "Street or city, state, zipcode",
	required = false,
	displayWaningMessage = true,
	RenderFormControl = () => {},
	renderProps = {},
	withIcon = false,
	iconSrc = asset.icons[`${constVar.ICON_LOCATION}`],
}) {
	const [warningMessage, setWarningMessage] = useState("");

	const onAddressValidationHanlder = (isValidAddress = true) => {
		if (isValidAddress) setWarningMessage("");
		else setWarningMessage("Please select a valid address.");
	};

	const app = (
		<>
			<FormGroupControl
				{...(id && { id: id })}
				withLabel={withLabel}
				label={label}
				{...(labelClassName && { labelClassName: labelClassName })}
				{...(formGroupClassName && { formGroupClassName: formGroupClassName })}
				placeholder={placeholder}
				required={required}
				withIcon={withIcon}
				iconSrc={iconSrc}
				displayWaningMessage={displayWaningMessage}
				warningMessage={warningMessage}
				RenderFormControl={RenderFormControl}
				renderProps={renderProps}
				validationProp={{ onAddressValidation: onAddressValidationHanlder }}
			/>
		</>
	);

	// const app = (
	// 	<Form.Group className={`tedkvn-formGroupControl ${formGroupClassName}`}>
	// 		{withLabel && (
	// 			<Form.Label
	// 				{...(id && { htmlFor: id })}
	// 				className={`formLabel ${labelClassName} ${
	// 					required && "tedkvn-required"
	// 				} }`}
	// 			>
	// 				{label}
	// 			</Form.Label>
	// 		)}
	// 		<RenderFormControl
	// 			{...(id && { id: id })}
	// 			{...(placeholder && { placeholder: placeholder })}
	// 			storageObjName={storageObjName}
	// 			required={required}
	// 			onAddressValidation={onAddressValidationHanlder}
	// 		/>
	// 		{displayWaningMessage && warningMessage.length > 0 && (
	// 			<Form.Text className="text-muted">
	// 				<span className="text-danger">{warningMessage}</span>
	// 			</Form.Text>
	// 		)}
	// 	</Form.Group>
	// );
	return app;
}

export default AddressFromGroupControl;
