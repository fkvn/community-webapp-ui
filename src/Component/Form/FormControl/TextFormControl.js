import React, { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";

function TextFormControl(props) {
	const {
		id = "",
		type = "text",
		placeholder = "",
		className = "",
		required = false,
		disabled = false,
		value = "",
		onMergeStorageSession = () => {},
		onLoadDefaultValue = () => {},
	} = props;

	const [loading, setLoading] = useState(true);

	const onChangeHandler = (value = "") => {
		// merge to storage session
		onMergeStorageSession(value);
	};

	useEffect(() => {
		// get information from the first time load
		if (loading) {
			onLoadDefaultValue();
			setLoading(false);
		}
	}, [loading, onLoadDefaultValue]);

	const app = (
		<FormControl
			{...(id && { id: id })}
			// ref={ref}
			value={value}
			type={type}
			className={`tedkvn-formControl ${className}`}
			placeholder={placeholder}
			required={required}
			disabled={disabled}
			onChange={(e) => onChangeHandler(e.target.value)}
		/>
	);
	return app;
}

export default TextFormControl;
