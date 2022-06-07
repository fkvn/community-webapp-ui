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
		onMergeStorageSession = () => {},
		onLoadDefaultValue = () => {},
	} = props;

	const [loading, setLoading] = useState(true);

	const ref = React.createRef();

	const onChangeHandler = (value = "") => {
		// merge to storage session
		onMergeStorageSession(value);
	};

	useEffect(() => {
		// get information from the first time load
		if (loading) {
			// load default Value
			const defaultValue = onLoadDefaultValue() || "";

			if (ref.current) {
				ref.current.value = defaultValue;
			}

			setLoading(false);
		}
	}, [loading, ref, onLoadDefaultValue]);

	const app = (
		<FormControl
			{...(id && { id: id })}
			ref={ref}
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
