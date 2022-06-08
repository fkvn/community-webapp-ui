import React from "react";
import { Form } from "react-bootstrap";
import CompanyIndustryFormControl from "../../FormControl/CompanyInfoFormControl/CompanyIndustryFormControl";

function CompanyIndustryFormGroupControl({
	id = "",
	withLabel = true,
	label = "Business Industry",
	labelClassName = "",
	placeholder = "",
	formGroupClassName = "",
	required = false,
	disabled = false,
	sessionStorageObjName = "",
	industryList = [],
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
			<CompanyIndustryFormControl
				{...(id && { id: id })}
				{...(placeholder && { placeholder: placeholder })}
				required={required}
				disabled={disabled}
				sessionStorageObjName={sessionStorageObjName}
				industryList={industryList}
			/>
		</Form.Group>
	);
	return app;
}

export default CompanyIndustryFormGroupControl;
