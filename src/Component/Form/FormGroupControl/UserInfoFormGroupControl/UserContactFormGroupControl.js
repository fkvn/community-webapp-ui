import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import UserAddressFormControlContainer from "../../../../Container/FormContainer/FormControlContainer/UserFormControlContainer/UserAddressFormControlContainer";
import UserUsernameFormControlContainer from "../../../../Container/FormContainer/FormControlContainer/UserFormControlContainer/UserUsernameFormControlContainer";
import AddressFromGroupControl from "../AddressFormGroupControl";
import TextFormGroupControl from "../TextFormGroupControl";

function UserContactFormGroupControl({
	sessionStorageObjName = "",
	usernameRequired = true,
	addressRequired = true,
}) {
	const usernameFormGroupControl = (
		<TextFormGroupControl
			id="classic-signup-usernameFormControl"
			required={usernameRequired}
			withLabel={false}
			sessionStorageObjName={sessionStorageObjName}
			RenderFormControl={UserUsernameFormControlContainer}
		/>
	);

	const addressFormGroupControl = (
		<AddressFromGroupControl
			id="classic-signup-addressFormControl"
			required={addressRequired}
			sessionStorageObjName={sessionStorageObjName}
			RenderFormControl={UserAddressFormControlContainer}
		/>
	);

	const app = (
		<Form.Group className="tedkvn-formGroupControl mt-5">
			<Form.Label className={`formLabel tedkvn-required`}>
				User Contact Info
			</Form.Label>
			<Row>
				<Col xs={12} md={5}>
					{usernameFormGroupControl}
				</Col>
				<Col xs={12} md={7}>
					{addressFormGroupControl}
				</Col>
			</Row>
		</Form.Group>
	);
	return app;
}

export default UserContactFormGroupControl;
