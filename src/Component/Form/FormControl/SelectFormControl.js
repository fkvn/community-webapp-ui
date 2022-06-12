import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

function SelectFormControl(props) {
	const {
		id = "",
		placeholder = "Please select",
		className = "",
		required = false,
		disabled = false,
		value = "",
		options = [],
		onMergeStorage = () => {},
		onLoadDefaultValue = () => {},
	} = props;

	const [loading, setLoading] = useState(true);

	const onSelectItemHandler = (selection = "") => {
		onMergeStorage(selection);
	};

	useEffect(() => {
		// get information from the first time load
		if (loading) {
			onLoadDefaultValue();
			setLoading(false);
		}
	}, [loading, onLoadDefaultValue]);

	const app = !loading && (
		<Form.Select
			{...(id && { id: id })}
			aria-label={id ? id : "Custom form select"}
			className={`tedkvn-formControl ${className}`}
			required={required}
			value={value}
			onChange={(p) => onSelectItemHandler(p.target.value)}
			disabled={disabled}
		>
			<option value="">{placeholder}</option>
			{options.length > 0 &&
				options.map((item, idx) => (
					<option key={idx} value={item || ""}>
						{item || ""}
					</option>
				))}
		</Form.Select>
	);

	return app;
}

export default SelectFormControl;
