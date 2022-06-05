import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import EmailFromGroupControl from "./EmailFormGroupControl";
import PhoneFromGroupControl from "./PhoneFormGroupControl";

function EPFormGroupControl({ sessionStorageObjName = "" }) {
	const firstNameFormGroupControl = (
		<EmailFromGroupControl
			id="classic-signup-emailFormControl"
			required={true}
			sessionStorageObjName={sessionStorageObjName}
		/>
	);

	const lastNameFormGroupControl = (
		<PhoneFromGroupControl
			id="classic-signup-phoneFormControl"
			required={true}
			sessionStorageObjName={sessionStorageObjName}
		/>
	);

	const app = (
		<Form.Group className="formGroupControl">
			<Row>
				<Col xs={12} md={6}>
					{firstNameFormGroupControl}
				</Col>
				<Col xs={12} md={6}>
					{lastNameFormGroupControl}
				</Col>
			</Row>
		</Form.Group>
	);
	return app;
}

export default EPFormGroupControl;
