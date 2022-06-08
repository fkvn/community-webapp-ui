import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import CompanyAddressFormControl from "../../FormControl/CompanyInfoFormControl/CompanyAddressFormControl";
import CompanyNameFormControl from "../../FormControl/CompanyInfoFormControl/CompanyNameFormControl";
import AddressFromGroupControl from "../AddressFormGroupControl";
import TextFormGroupControl from "../TextFormGroupControl";

function CompanyContactFormGroupControl({
	sessionStorageObjName = "",
	formGroupClassName = "",
	companynameRequired = true,
	addressRequired = true,
}) {
	const companynameFormGroupControl = (
		<TextFormGroupControl
			required={companynameRequired}
			withLabel={false}
			sessionStorageObjName={sessionStorageObjName}
			RenderFormControl={CompanyNameFormControl}
		/>
	);

	const addressFormGroupControl = (
		<AddressFromGroupControl
			required={addressRequired}
			placeholder="Where is your business"
			sessionStorageObjName={sessionStorageObjName}
			RenderFormControl={CompanyAddressFormControl}
		/>
	);

	const app = (
		<Form.Group className={`tedkvn-formGroupControl ${formGroupClassName}`}>
			<Form.Label className={`formLabel tedkvn-required`}>
				Business Public Info
			</Form.Label>
			<Row>
				<Col xs={12} md={5}>
					{companynameFormGroupControl}
				</Col>
				<Col xs={12} md={7}>
					{addressFormGroupControl}
				</Col>
			</Row>
		</Form.Group>
	);
	return app;
}

export default CompanyContactFormGroupControl;
