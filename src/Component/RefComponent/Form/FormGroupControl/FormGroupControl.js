import { Form, InputGroup, Stack } from "react-bootstrap";

import ImageFrame from "../../ImageFrame/ImageFrame";

function FormGroupControl({
	id = "",
	withLabel = false,
	label = "",
	labelClassName = "",
	placeholder = "",
	formGroupClassName = "",
	inputGroupClassName = "",
	required = false,
	disabled = false,
	withIcon = false,
	iconSrc = "",
	RenderFormControl = () => {},
	renderProps = {},
	validationProp = {},
	displayWaningMessage = true,
	warningMessage = "",
	note = "",
	// gaps
	labelGap = 0,
	messageGap = 1,
}) {
	const app = (
		<Form.Group
			className={`custom-formGroupControl custom-center ${formGroupClassName}`}
			{...(id && { id: "formgroup-" + id })}
		>
			<Stack gap={labelGap}>
				{withLabel && (
					<Form.Label
						{...(id && { htmlFor: id })}
						className={`formLabel ${labelClassName} ${
							required && "custom-required"
						} }`}
					>
						{label}
					</Form.Label>
				)}
				<Stack gap={messageGap}>
					<InputGroup
						className={`custom-formGroupControl-inpurGroup ${inputGroupClassName}`}
					>
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

					{note.length > 0 && (
						<Form.Text className="text-muted">
							<span className="text-danger">{note}</span>
						</Form.Text>
					)}
				</Stack>
			</Stack>
		</Form.Group>
	);
	return app;
}

export default FormGroupControl;
