import { Form, InputGroup, Stack } from "react-bootstrap";

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
	withIcon = false,
	iconSrc = "",
	RenderFormControl = () => {},
	renderProps = {},
	validationProp = {},
	displayWaningMessage = true,
	warningMessage = "",
	// gaps
	labelGap = 2,
	messageGap = 1,
}) {
	const app = (
		<Form.Group
			className={`tedkvn-formGroupControl tedkvn-center ${formGroupClassName}`}
			{...(id && { id: "formgroup-" + id })}
		>
			<Stack gap={labelGap}>
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
				<Stack gap={messageGap}>
					<InputGroup className="tedkvn-formGroupControl-inpurGroup">
						{withIcon && <ImageFrame src={iconSrc} {...(id && { id: id })} />}
						<RenderFormControl
							{...renderProps}
							{...(id && { id: id })}
							required={required}
							disabled={disabled}
							{...(placeholder && { placeholder: placeholder })}
							{...validationProp}
						/>
					</InputGroup>
					{displayWaningMessage && warningMessage.length > 0 && (
						<Form.Text className="text-muted">
							<span className="text-danger">{warningMessage}</span>
						</Form.Text>
					)}
				</Stack>
			</Stack>
		</Form.Group>
	);
	return app;
}

export default FormGroupControl;
