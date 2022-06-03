import React from "react";
import { Form } from "react-bootstrap";
import NewGoogleAutoComplete from "../../AutoComplete/NewGoogleAutoComplete";

function AddressFromGroupControl({
	id = "",
	formGroupClassName = "",
	sessionStorageObjName = "",
}) {
	const app = (
		<Form.Group className={`formGroupControl ${formGroupClassName}`}>
			<NewGoogleAutoComplete
				{...(id && { id: id })}
				sessionStorageObjName={sessionStorageObjName}
			/>

			{/* <GoogleAutoComplete
				
				sessionStorageObjName={sessionStorageObjName}
			/> */}
		</Form.Group>
	);
	return app;
}

export default AddressFromGroupControl;
