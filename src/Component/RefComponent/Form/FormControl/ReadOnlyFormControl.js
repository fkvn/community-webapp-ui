import React from "react";
import { Form } from "react-bootstrap";

function ReadOnlyFormControl({ title = "", className = "", style = {} }) {
	const app = (
		<Form.Text className={className} style={style}>
			{title}
		</Form.Text>
	);
	return app;
}

export default ReadOnlyFormControl;
