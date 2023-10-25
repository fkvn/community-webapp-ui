import { Form } from "react-bootstrap";
import LoadingButton from "../../Button/LoadingButton";

function PrevstepFormGroupControl({
	id = "",
	isLoading = false,
	formGroupClassName = "",
	title = "Previous Step",
	size = "md",
	customSubmit = true,
	variant = "secondary",
	onClick = () => {},
	className = "",
	buttonStyle = {},
}) {
	const app = (
		<Form.Group className={`custom-formGroupControl ${formGroupClassName}`}>
			<LoadingButton
				{...(id && { id: id })}
				size={size}
				className={`custom-formNavigationBtn ${className}`}
				{...(!customSubmit && { type: "submit" })}
				{...(customSubmit && { onClick: onClick })}
				title={title}
				isLoading={isLoading}
				variant={variant}
				buttonStyle={buttonStyle}
			/>
		</Form.Group>
	);
	return app;
}

export default PrevstepFormGroupControl;
