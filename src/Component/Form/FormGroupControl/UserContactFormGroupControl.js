import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import AddressFromGroupControl from "./AddressFormGroupControl";
import UsernameFormGroupControl from "./UsernameFormGroupControl";

function UserContactFormGroupControl({
	sessionStorageObjName = "",
	usernameRequired = true,
	addressRequired = true,
}) {
	const usernameFormGroupControl = (
		<UsernameFormGroupControl
			id="classic-signup-usernameFormControl"
			required={usernameRequired}
			withLabel={false}
			sessionStorageObjName={sessionStorageObjName}
		/>
	);

	const addressFormGroupControl = (
		<AddressFromGroupControl
			id="classic-signup-addressFormControl"
			required={addressRequired}
			sessionStorageObjName={sessionStorageObjName}
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
