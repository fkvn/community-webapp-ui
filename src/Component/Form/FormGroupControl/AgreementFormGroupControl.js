import React from "react";
import { Form } from "react-bootstrap";
import AgreementFormControl from "../FormControl/AgreementFormControl";

function AgreementFormGroupControl({
	formGroupClassName = "",
	withAdsAgreement = true,
}) {
	const app = (
		<Form.Group className={`tedkvn-formGroupControl ${formGroupClassName}`}>
			<AgreementFormControl withAdsAgreement={withAdsAgreement} />
		</Form.Group>
	);
	return app;
}

export default AgreementFormGroupControl;
