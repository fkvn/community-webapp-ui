import { useEffect, useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import ImageFrame from "../../ImageFrame/ImageFrame";

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
		// this is for simple check box
		onClick = () => {},
		label = "",
		name = "",
		inline = false,
		checked = false,
		// when the formControl comes with an icon
		withIcon = false,
		iconSrc = "",
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
			className={`${!customClassName && "tedkvn-formControl"} ${className}
	${withIcon && "border-0"}
	`}
			style={{
				minWidth: "10rem",
			}}
			placeholder={placeholder}
			required={required}
			disabled={disabled}
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
					inline={inline}
					required={required}
					disabled={disabled}
					className="text-primary"
					onChange={onClick}
					{...(type === "checkbox" && { checked: value })}
					{...(type === "radio" && { value: value, checked: checked })}
				/>
			) : (
				<>
					{withIcon ? (
						<InputGroup>
							<ImageFrame iconSrc={iconSrc} className="mx-2" />
							{formControl}
						</InputGroup>
					) : (
						formControl
					)}
				</>
			)}
		</>
	);
	return app;
}

export default FormControlControlled;
