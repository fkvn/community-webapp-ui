import React from "react";
import { Form } from "react-bootstrap";

function ReadOnlyFormControl({ title = "", className = "" }) {
	const app = <Form.Text className={className}>{title}</Form.Text>;
	return app;
}

export default ReadOnlyFormControl;
