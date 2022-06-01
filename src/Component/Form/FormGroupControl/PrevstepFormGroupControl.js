import React from "react";
import { Button, Form } from "react-bootstrap";

function PrevstepFormGroupControl({
	formGroupClassName = "",
	btnTitle = "Previous Step",
	btnSize = "md",
	btnVariant = "secondary",
	btnOnClick = () => {},
	btnClassName = "",
}) {
	const app = (
		<Form.Group className={`formGroupControl ${formGroupClassName}`}>
			<Button
				size={btnSize}
				variant={btnVariant}
				className={`formNavigationBtn ${btnClassName}`}
				onClick={btnOnClick}
			>
				{btnTitle}
			</Button>
		</Form.Group>
	);
	return app;
}

export default PrevstepFormGroupControl;
