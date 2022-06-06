import React from "react";
import { Form } from "react-bootstrap";
import NewGoogleAutoComplete from "../../AutoComplete/NewGoogleAutoComplete";

function AddressFromGroupControl({
	id = "",
	formGroupClassName = "",
	sessionStorageObjName = "",
	required = false,
}) {
	const app = (
		<Form.Group className={`tedkvn-formGroupControl ${formGroupClassName}`}>
			<NewGoogleAutoComplete
				{...(id && { id: id })}
				placeholder="Where are you from"
				sessionStorageObjName={sessionStorageObjName}
				required={required}
			/>
		</Form.Group>
	);
	return app;
}

export default AddressFromGroupControl;
