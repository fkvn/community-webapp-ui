import { Form } from "react-bootstrap";
import LoadingButton from "../../Button/LoadingButton";

function SubmitButtonFormGroupControl({
	id = "",
	formGroupClassName = "",
	title = "Next",
	size = "md",
	isLoading = false,
	className = "",
	type = "primary",
	customSubmit = true,
	withIcon = false,
	iconSrc = "",
	onClick = () => {},
	buttonStyle = "",
	loadingColor = "",
}) {
	const app = (
		<Form.Group className={`custom-formGroupControl ${formGroupClassName}`}>
			<LoadingButton
				{...(id && { id: id })}
				size={size}
				className={`custom-formNavigationBtn ${className}`}
				type={type}
				onClick={onClick}
				customSubmit={customSubmit}
				title={title}
				isLoading={isLoading}
				withIcon={withIcon}
				iconSrc={iconSrc}
				buttonStyle={buttonStyle}
				{...(loadingColor && { loadingColor: loadingColor })}
			/>
		</Form.Group>
	);
	return app;
}

export default SubmitButtonFormGroupControl;
