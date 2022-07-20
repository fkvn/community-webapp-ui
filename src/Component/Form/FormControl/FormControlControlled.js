import { useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";

function FormControlControlled(props) {
	const {
		id = "",
		type = "text",
		placeholder = "",
		className = "",
		customClassName = false,
		required = false,
		disabled = false,
		value = "",
		onMergeStorage = () => {},
		onLoadDefaultValue = () => {},
		style = {},
		// this is for simple check box
		onClick = () => {},
		label = "",
		name = "",
		inline = false,
		checked = false,
		maxLength = "50",
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

	const formControl = (
		<FormControl
			{...(id && { id: id })}
			value={value}
			type={type}
			style={style}
			className={`${!customClassName && "tedkvn-formControl"}  ${className}`}
			placeholder={placeholder}
			required={required}
			disabled={disabled}
			maxLength={maxLength}
			onChange={(e) => onChangeHandler(e.target.value)}
		/>
	);

	const app = (
		<>
			{type === "checkbox" || type === "radio" ? (
				<Form.Check
					type={type}
					label={label}
					name={name}
					style={style}
					inline={inline}
					required={required}
					disabled={disabled}
					className={`${
						!customClassName && " tedkvn-formControl "
					}${className}`}
					// className="text-primary"
					onChange={onClick}
					{...(type === "checkbox" && { checked: value })}
					{...(type === "radio" && { value: value, checked: checked })}
				/>
			) : (
				<>{formControl}</>
			)}
		</>
	);
	return app;
}

export default FormControlControlled;
