import React from "react";
import { Form } from "react-bootstrap";
import ReadOnlyFormControl from "../FormControl/ReadOnlyFormControl";

function ReadOnlyFormGroupControl({
	id = "",
	formGroupClassName = "",
	title = "",
	className = "",
}) {
	const app = (
		<Form.Group className={`formGroupControl ${formGroupClassName}`}>
			<ReadOnlyFormControl
				{...(id && { id: id })}
				title={title}
				className={className}
			/>
		</Form.Group>
	);
	return app;
}

export default ReadOnlyFormGroupControl;
