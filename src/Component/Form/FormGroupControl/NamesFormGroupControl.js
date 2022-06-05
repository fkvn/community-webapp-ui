import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import FirstNameFormGroupControl from "./FirstNameFormGroupControl";
import LastNameFormGroupControl from "./LastNameFormGroupControl";

function NamesFormGroupControl({ sessionStorageObjName = "" }) {
	const firstNameFormGroupControl = (
		<FirstNameFormGroupControl
			id="classic-signup-firstNameControl"
			required={true}
			sessionStorageObjName={sessionStorageObjName}
		/>
	);

	const lastNameFormGroupControl = (
		<LastNameFormGroupControl
			id="classic-signup-lastNameControl"
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

export default NamesFormGroupControl;
