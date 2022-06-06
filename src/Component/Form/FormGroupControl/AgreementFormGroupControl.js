import React from "react";
import { Form } from "react-bootstrap";
import AgreementFormControl from "../FormControl/AgreementFormControl";

function AgreementFormGroupControl({ formGroupClassName = "" }) {
	const app = (
		<Form.Group className={`tedkvn-formGroupControl ${formGroupClassName}`}>
			<AgreementFormControl />
		</Form.Group>
	);
	return app;
}

export default AgreementFormGroupControl;
