import React, { forwardRef } from "react";
import { Form } from "react-bootstrap";

function SelectFormControl(props, ref) {
	const {
		id = "",
		placeholder = "Please select",
		className = "",
		required = false,
		disabled = false,
		dropdownItems = [],
		onSelectItem = () => {},
	} = props;

	if (!ref) {
		ref = React.createRef();
	}

	const app = (
		<Form.Select
			{...(id && { id: id })}
			aria-label={id ? id : "Custom form select"}
			className={`tedkvn-formControl ${className}`}
			required={required}
			onChange={(p) => onSelectItem(p.target.value)}
			ref={ref}
			disabled={disabled}
		>
			<option value="">{placeholder}</option>
			{dropdownItems.length > 0 &&
				dropdownItems.map((item, idx) => (
					<option key={idx} value={item.value || ""}>
						{item.value || ""}
					</option>
				))}
		</Form.Select>
	);

	return app;
}

export default forwardRef(SelectFormControl);
