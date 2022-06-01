import React from "react";
import { Form } from "react-bootstrap";
import NewEmailFormControl from "../FormControl/NewEmailFormControl";

function EmailFromGroupControl({
	formGroupClassName = "",
	formControlId = "",
	sessionStorageObjName = "",
}) {
	const app = (
		<Form.Group className={`formGroupControl ${formGroupClassName}`}>
			<NewEmailFormControl
				{...(formControlId && { id: formControlId })}
				withLabel={true}
				required={true}
				sessionStorageObjName={sessionStorageObjName}
			/>
		</Form.Group>
	);
	return app;
}

export default EmailFromGroupControl;
