import React, { forwardRef } from "react";
import { Form } from "react-bootstrap";
import * as util from "../../../Util/Util";

function SelectFormControl(props, ref) {
	const {
		id = "",
		placeholder = "",
		className = "",
		required = false,
		dropdownItems = [],
		sessionStorageObjName = "",
		sessionStoragePropName = "",
	} = props;

	const app = (
		<Form.Select
			{...(id && { id: id })}
			aria-label={id ? id : "Custom form select"}
			className={`tedkvn-formControl ${className}`}
			required={required}
			onChange={(p) =>
				util.saveToSessionStore(
					sessionStorageObjName,
					sessionStoragePropName,
					p.target.value
				)
			}
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
	);

	return app;
}

export default forwardRef(SelectFormControl);
