import React, { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import * as util from "../../../Util/util";

function NewTextFormControl(props) {
	const {
		id = "",
		type = "text",
		placeholder = "",
		className = "",
		required = false,
		disabled = false,
		sessionStorageObjName = "",
		sessionStoragePropName = "",
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
		<FormControl
			{...(id && { id: id })}
			ref={ref}
			type={type}
			className={`formControl ${className}`}
			placeholder={placeholder}
			required={required}
			disabled={disabled}
			onChange={(e) =>
				util.saveToSessionStore(
					sessionStorageObjName,
					sessionStoragePropName,
					e.target.value
				)
			}
		/>
	);
	return app;
}

export default NewTextFormControl;
