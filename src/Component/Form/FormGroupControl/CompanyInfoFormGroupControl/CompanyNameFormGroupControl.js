import React from "react";
import { Form } from "react-bootstrap";
import CompanyNameFormControl from "../../FormControl/CompanyInfoFormControl/CompanyNameFormControl";

function CompanyNameFormGroupControl({
	id = "",
	withLabel = true,
	label = "Business Public Name",
	labelClassName = "",
	formGroupClassName = "",
	required = false,
	sessionStorageObjName = "",
}) {
	const app = (
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
			<CompanyNameFormControl
				{...(id && { id: id })}
				required={required}
				sessionStorageObjName={sessionStorageObjName}
			/>
		</Form.Group>
	);
	return app;
}

export default CompanyNameFormGroupControl;
