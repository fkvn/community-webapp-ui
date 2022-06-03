import React from "react";
import { Form } from "react-bootstrap";
import * as util from "../../../Util/util";
import NewTextFormControl from "../FormControl/NewTextFormControl";

function LastNameFormGroupControl({
	id = "",
	withLabel = true,
	label = "Last Name",
	labelClassName = "",
	placeholder = "Enter your last name",
	required = false,
	formGroupClassName = "",
	sessionStorageObjName = "",
	sessionStoragePropName = "lastname",
}) {
	const app = (
		<Form.Group className={`formGroupControl ${formGroupClassName}`}>
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
				placeholder={placeholder}
				sessionStorageObjName={sessionStorageObjName}
				sessionStoragePropName={sessionStoragePropName}
				onChange={(e) =>
					util.saveToSessionStore(
						sessionStorageObjName,
						sessionStoragePropName,
						e.target.value
					)
				}
			/>
		</Form.Group>
	);
	return app;
}

export default LastNameFormGroupControl;
