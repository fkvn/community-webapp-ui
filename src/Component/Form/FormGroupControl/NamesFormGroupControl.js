import React from "react";
import { Col, Row } from "react-bootstrap";
import FirstNameFormGroupControl from "./FirstNameFormGroupControl";
import LastNameFormGroupControl from "./LastNameFormGroupControl";

function NamesFormGroupControl({ sessionStorageObjName = "" }) {
	const firstNameFormGroupControl = (
		<FirstNameFormGroupControl
			formControlId="classic-signup-firstNameControl"
			sessionStorageObjName={sessionStorageObjName}
		/>
	);

	const lastNameFormGroupControl = (
		<LastNameFormGroupControl
			formControlId="classic-signup-lastNameControl"
			sessionStorageObjName={sessionStorageObjName}
		/>
	);

	const app = (
		<Row>
			<Col xs={12} md={6}>
				{firstNameFormGroupControl}
			</Col>
			<Col xs={12} md={6}>
				{lastNameFormGroupControl}
			</Col>
		</Row>
	);
	return app;
}

export default NamesFormGroupControl;
