import { useState } from "react";
import { Form } from "react-bootstrap";

function AddressFromGroupControl({
	id = "",
	withLabel = false,
	label = "Address",
	labelClassName = "",
	formGroupClassName = "",
	storageObjName = "",
	placeholder = "",
	required = false,
	displayWaningMessage = true,
	RenderFormControl = () => {},
}) {
	const [warningMessage, setWarningMessage] = useState("");

	const onAddressValidationHanlder = (isValidAddress = true) => {
		if (isValidAddress) setWarningMessage("");
		else setWarningMessage("Please select a valid address.");
	};

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
				{...(placeholder && { placeholder: placeholder })}
				storageObjName={storageObjName}
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
