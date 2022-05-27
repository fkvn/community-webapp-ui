import React, { forwardRef } from "react";
import { Form } from "react-bootstrap";

function DropDownFormControl(props, ref) {
	const {
		id = "",
		withLabel = false,
		labelTitle = "",
		placeholder = "",
		className = "p-3",
		required = false,
		dropdownItems = [],
		onChange = () => {},
	} = props;

	const app = (
		<>
			{withLabel && (
				<Form.Label
					{...(id && { htmlFor: id })}
					className={`fs-5 ${required && "tedkvn-required"} }`}
				>
					{labelTitle}
				</Form.Label>
			)}

			<Form.Select
				{...(id && { id: id })}
				aria-label={id ? id : "Custom form select"}
				className={`formControl ${className}`}
				required={required}
				onChange={onChange}
				ref={ref}
			>
				<option value="">{placeholder}</option>
				{dropdownItems.length > 0 &&
					dropdownItems.map((item, idx) => (
						<option key={idx} value={item.value || ""}>
							{item.value || ""}
						</option>
					))}
			</Form.Select>
		</>
	);

	return app;
}

export default forwardRef(DropDownFormControl);
