import React from "react";
import { Form } from "react-bootstrap";
import LoadingButton from "../../Button/LoadingButton";

function SubmitButtonFormGroupControl({
	formGroupClassName = "",
	title = "Next",
	size = "md",
	show = false,
	className = "",
	variant = "primary",
	customSubmit = false,
	onClick = () => {},
}) {
	const app = (
		<Form.Group className={`tedkvn-formGroupControl ${formGroupClassName}`}>
			<LoadingButton
				size={size}
				className={`tedkvn-formNavigationBtn ${className}`}
				{...(!customSubmit && { type: "submit" })}
				{...(customSubmit && { onClick: onClick })}
				title={title}
				show={show}
				variant={variant}
			/>
		</Form.Group>
	);
	return app;
}

export default SubmitButtonFormGroupControl;
