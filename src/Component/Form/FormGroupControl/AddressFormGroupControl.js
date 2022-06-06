import React, { useState } from "react";
import { Form } from "react-bootstrap";
import NewGoogleAutoComplete from "../../AutoComplete/NewGoogleAutoComplete";

function AddressFromGroupControl({
	id = "",
	formGroupClassName = "",
	sessionStorageObjName = "",
	required = false,
	displayWaningMessage = true,
}) {
	const [warningMessage, setWarningMessage] = useState("");

	const onAddressValidationHanlder = (isValidEmail = true) => {
		if (isValidEmail) setWarningMessage("");
		else setWarningMessage("Please select a valid address.");
	};

	const app = (
		<Form.Group className={`tedkvn-formGroupControl ${formGroupClassName}`}>
			<NewGoogleAutoComplete
				{...(id && { id: id })}
				placeholder="Where are you from"
				sessionStorageObjName={sessionStorageObjName}
				required={required}
				onAddressValidation={onAddressValidationHanlder}
			/>
			{displayWaningMessage && warningMessage.length > 0 && (
				<Form.Text className="text-muted">
					<span className="text-danger">{warningMessage}</span>
				</Form.Text>
			)}
		</Form.Group>
	);
	return app;
}

export default AddressFromGroupControl;
