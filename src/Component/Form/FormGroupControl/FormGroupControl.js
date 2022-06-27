import { Form, InputGroup } from "react-bootstrap";

import ImageFrame from "../../ImageFrame/ImageFrame";

function FormGroupControl({
	id = "",
	withLabel = false,
	label = "",
	labelClassName = "",
	placeholder = "",
	formGroupClassName = "",
	required = false,
	disabled = false,
	// storageObjName = "",
	withIcon = false,
	iconSrc = "",
	RenderFormControl = () => {},
	renderProps = {},
	validationProp = {},
	displayWaningMessage = true,
	warningMessage = "",
}) {
	const app = (
		<Form.Group
			className={`tedkvn-formGroupControl tedkvn-center ${formGroupClassName}`}
			{...(id && { id: "formgroup-" + id })}
		>
			{withLabel && (
				<Form.Label
					{...(id && { htmlFor: id })}
					className={`formLabel ${labelClassName} ${
						required && "tedkvn-required"
					} }`}
				>
					{label}
				</Form.Label>
			)}
			<InputGroup>
				{withIcon && <ImageFrame src={iconSrc} {...(id && { id: id })} />}
				<RenderFormControl
					{...renderProps}
					{...(id && { id: id })}
					required={required}
					disabled={disabled}
					{...(placeholder && { placeholder: placeholder })}
					// {...(storageObjName && {
					// 	storageObjName: storageObjName,
					// })}
					{...validationProp}
				/>
			</InputGroup>
			{displayWaningMessage && warningMessage.length > 0 && (
				<Form.Text className="text-muted">
					<span className="text-danger">{warningMessage}</span>
				</Form.Text>
			)}
		</Form.Group>
	);
	return app;
}

export default FormGroupControl;
