import { useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";

function FormControlControlled(props) {
	const {
		id = "",
		type = "text",
		placeholder = "",
		className = "",
		required = false,
		disabled = false,
		value = "",
		onMergeStorage = () => {},
		onLoadDefaultValue = () => {},
		// this is for simple check box
		onClick = () => {},
		label = "",
		name = "",
		inline = false,
		checked = false,
	} = props;

	const [loading, setLoading] = useState(true);

	const onChangeHandler = (value = "") => {
		// merge to storage session
		onMergeStorage(value);
	};

	useEffect(() => {
		// get information from the first time load
		if (loading) {
			onLoadDefaultValue();
			setLoading(false);
		}
	}, [loading, onLoadDefaultValue]);

	// console.log(defaultChecked);

	const app = (
		<>
			{type === "checkbox" || type === "radio" ? (
				<Form.Check
					type={type}
					label={label}
					name={name}
					inline={inline}
					required={required}
					disabled={disabled}
					className="text-primary"
					onChange={onClick}
					{...(type === "checkbox" && { checked: value })}
					{...(type === "radio" && { value: value, checked: checked })}
				/>
			) : (
				<FormControl
					{...(id && { id: id })}
					value={value}
					type={type}
					className={`tedkvn-formControl ${className}`}
					placeholder={placeholder}
					required={required}
					disabled={disabled}
					onChange={(e) => onChangeHandler(e.target.value)}
				/>
			)}
		</>
	);
	return app;
}

export default FormControlControlled;
