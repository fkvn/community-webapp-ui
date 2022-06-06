import React from "react";
import { Button, Form } from "react-bootstrap";

function PrevstepFormGroupControl({
	formGroupClassName = "",
	title = "Previous Step",
	size = "md",
	variant = "secondary",
	onClick = () => {},
	className = "",
}) {
	const app = (
		<Form.Group className={`tedkvn-formGroupControl ${formGroupClassName}`}>
			<Button
				size={size}
				variant={variant}
				className={`tedkvn-formNavigationBtn ${className}`}
				onClick={onClick}
			>
				{title}
			</Button>
		</Form.Group>
	);
	return app;
}

export default PrevstepFormGroupControl;
