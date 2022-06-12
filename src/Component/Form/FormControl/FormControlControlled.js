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

	if (type === "checkbox") {
		console.log("checkbox");
		console.log(value);
	}

	const app = (
		<>
			{type === "checkbox" ? (
				<Form.Check
					type="checkbox"
					label={label}
					className="text-primary"
					onChange={onClick}
					checked={value}
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
