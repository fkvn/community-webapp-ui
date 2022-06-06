import React from "react";
import { Form } from "react-bootstrap";
import * as constVar from "../../../Util/ConstVar";
import NewTextFormControl from "../FormControl/NewTextFormControl";

function UsernameFormGroupControl({
	id = "",
	withLabel = true,
	label = "User Contact Info",
	labelClassName = "",
	placeholder = "Preferred Name",
	formGroupClassName = "",
	required = false,
	disabled = false,
	sessionStorageObjName = "",
	sessionStoragePropName = constVar.STORAGE_USERNAME_PROP,
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

export default UsernameFormGroupControl;
