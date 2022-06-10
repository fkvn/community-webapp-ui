import React from "react";
import { Form } from "react-bootstrap";

function FormGroupControl({
	id = "",
	withLabel = false,
	label = "",
	labelClassName = "",
	placeholder = "",
	formGroupClassName = "",
	required = false,
	disabled = false,
	storageObjName = "",
	RenderFormControl = () => {},
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
			<RenderFormControl
				{...(id && { id: id })}
				required={required}
				disabled={disabled}
				{...(placeholder && { placeholder: placeholder })}
				{...(storageObjName && {
					storageObjName: storageObjName,
				})}
			/>
		</Form.Group>
	);
	return app;
}

export default FormGroupControl;
