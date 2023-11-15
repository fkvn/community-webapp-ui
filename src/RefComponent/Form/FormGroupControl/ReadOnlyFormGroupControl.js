import React from "react";
import { Form } from "react-bootstrap";
import ReadOnlyFormControl from "../FormControl/ReadOnlyFormControl";

function ReadOnlyFormGroupControl({
	id = "",
	formGroupClassName = "",
	title = "",
	className = "",
	style = {},
}) {
	const app = (
		<Form.Group className={`custom-formGroupControl ${formGroupClassName}`}>
			<ReadOnlyFormControl
				{...(id && { id: id })}
				title={title}
				className={className}
				style={style}
			/>
		</Form.Group>
	);
	return app;
}

export default ReadOnlyFormGroupControl;
