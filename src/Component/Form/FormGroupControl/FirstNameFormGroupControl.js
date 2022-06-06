import React from "react";
import { Form } from "react-bootstrap";
import * as constVar from "../../../Util/ConstVar";
import NewTextFormControl from "../FormControl/NewTextFormControl";

function FirstNameFormGroupControl({
	id = "",
	withLabel = true,
	label = "First Name",
	labelClassName = "",
	placeholder = "Enter your first name",
	formGroupClassName = "",
	required = false,
	disabled = false,
	sessionStorageObjName = "",
	sessionStoragePropName = constVar.STORAGE_FIRSTNAME_PROP,
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
			<NewTextFormControl
				{...(id && { id: id })}
				required={required}
				disabled={disabled}
				placeholder={placeholder}
				sessionStorageObjName={sessionStorageObjName}
				sessionStoragePropName={sessionStoragePropName}
			/>
		</Form.Group>
	);
	return app;
}

export default FirstNameFormGroupControl;
