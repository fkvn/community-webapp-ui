import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import * as util from "../../../Util/util";

function NewTextFormControl(props) {
	const {
		id = "",
		withLabel = false,
		label = "",
		labelClassName = "",
		placeholder = "",
		className = "",
		required = false,
		autoFocus = false,
		sessionStorageObjName = "",
		sessionStoragePropName = "",
		onChange = () => {},
	} = props;

	const [loading, setLoading] = useState(true);

	const ref = React.createRef();

	useEffect(() => {
		if (loading) {
			// get information from the first time load
			const defaultValue =
				util.getSessionStorageObj(sessionStorageObjName)[
					`${sessionStoragePropName}`
				] || "";

			if (ref.current) {
				ref.current.value = defaultValue;
			}

			setLoading(false);
		}
	}, [loading, ref, sessionStorageObjName, sessionStoragePropName]);

	const app = (
		<>
			{withLabel && (
				<Form.Label
					{...(id && { htmlFor: id })}
					className={`formLabel ${labelClassName} ${
						required && "tedkvn-required"
					} }`}
				>
					{label}
				</Form.Label>
			)}
			<Form.Control
				{...(id && { id: id })}
				ref={ref}
				type="text"
				className={`formControl ${className}`}
				placeholder={placeholder}
				required={required}
				autoFocus={autoFocus}
				onChange={onChange}
			/>
		</>
	);
	return app;
}

export default NewTextFormControl;
