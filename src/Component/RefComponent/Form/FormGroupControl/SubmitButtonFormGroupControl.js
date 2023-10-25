import { Form } from "react-bootstrap";
import LoadingButton from "../../Button/LoadingButton";

function SubmitButtonFormGroupControl({
	id = "",
	formGroupClassName = "",
	title = "Next",
	size = "md",
	isLoading = false,
	className = "",
	variant = "primary",
	customSubmit = false,
	withIcon = false,
	iconSrc = "",
	onClick = () => {},
	buttonStyle = "",
	loadingColor = "",
}) {
	console.log(isLoading);

	const app = (
		<Form.Group className={`custom-formGroupControl ${formGroupClassName}`}>
			<LoadingButton
				{...(id && { id: id })}
				size={size}
				className={`custom-formNavigationBtn ${className}`}
				type="submit"
				onClick={onClick}
				{...(!customSubmit && { type: "submit" })}
				{...(customSubmit && {
					type: "submit",
					onClick: onClick,
				})}
				title={title}
				isLoading={isLoading}
				variant={variant}
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
