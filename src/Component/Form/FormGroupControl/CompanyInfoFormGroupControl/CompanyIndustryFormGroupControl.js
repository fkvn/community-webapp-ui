import { Form } from "react-bootstrap";
import CompanyIndustryFormControlContainer from "../../../../Container/FormContainer/FormControlContainer/CompanyFormControlContainer/CompanyIndustryFormControlContainer";

function CompanyIndustryFormGroupControl({
	id = "",
	withLabel = true,
	label = "Business Industry",
	labelClassName = "",
	placeholder = "",
	formGroupClassName = "",
	required = false,
	disabled = false,
	storageObjName = "",
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
			<CompanyIndustryFormControlContainer
				{...(id && { id: id })}
				{...(placeholder && { placeholder: placeholder })}
				required={required}
				disabled={disabled}
				storageObjName={storageObjName}
			/>
		</Form.Group>
	);
	return app;
}

export default CompanyIndustryFormGroupControl;
