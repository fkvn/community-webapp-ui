import React from "react";
import { Form } from "react-bootstrap";
import NewPhoneFormControl from "../FormControl/NewPhoneFormControl";

function PhoneFromGroupControl({
	formGroupClassName = "",
	formControlId = "",
	sessionStorageObjName = "",
}) {
	const app = (
		<Form.Group className={`formGroupControl ${formGroupClassName}`}>
			<NewPhoneFormControl
				{...(formControlId && { id: formControlId })}
				withLabel={true}
				required={true}
				sessionStorageObjName={sessionStorageObjName}
			/>
		</Form.Group>
	);
	return app;
}

export default PhoneFromGroupControl;
