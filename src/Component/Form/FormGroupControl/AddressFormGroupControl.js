import React from "react";
import { Form } from "react-bootstrap";
import GoogleAutoComplete from "../../AutoComplete/GoogleAutoComplete";

function AddressFromGroupControl({
	formGroupClassName = "",
	formControlId = "",
	sessionStorageObjName = "",
}) {
	const app = (
		<Form.Group className={`formGroupControl ${formGroupClassName}`}>
			<GoogleAutoComplete
				{...(formControlId && { id: formControlId })}
				sessionStorageObjName={sessionStorageObjName}
			/>
		</Form.Group>
	);
	return app;
}

export default AddressFromGroupControl;
