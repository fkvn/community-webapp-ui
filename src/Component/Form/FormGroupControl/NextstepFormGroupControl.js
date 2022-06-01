import React from "react";
import { Form } from "react-bootstrap";
import LoadingButton from "../../Button/LoadingButton";

function NextstepFormGroupControl({
	formGroupClassName = "",
	btnTitle = "Next Step",
	btnSize = "md",
	btnShow = false,
	btnClassName = "",
}) {
	const app = (
		<Form.Group className={`formGroupControl ${formGroupClassName}`}>
			<LoadingButton
				size={btnSize}
				className={`formNavigationBtn ${btnClassName}`}
				type="submit"
				title={btnTitle}
				show={btnShow}
			/>
		</Form.Group>
	);
	return app;
}

export default NextstepFormGroupControl;
