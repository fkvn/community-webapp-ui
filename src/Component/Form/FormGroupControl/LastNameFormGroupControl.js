import React from "react";
import { Form } from "react-bootstrap";
import * as util from "../../../Util/util";
import NewTextFormControl from "../FormControl/NewTextFormControl";

function LastNameFormGroupControl({
	formGroupClassName = "",
	formControlId = "",
	sessionStorageObjName = "",
	sessionStoragePropName = "lastname",
}) {
	const app = (
		<Form.Group className={`formGroupControl ${formGroupClassName}`}>
			<NewTextFormControl
				{...(formControlId && { id: formControlId })}
				withLabel={true}
				label="Last Name"
				required={true}
				placeholder="Enter your last name"
				sessionStorageObjName={sessionStorageObjName}
				sessionStoragePropName={sessionStoragePropName}
				onChange={(e) =>
					util.saveToSessionStore(
						sessionStorageObjName,
						sessionStoragePropName,
						e.target.value
					)
				}
			/>
		</Form.Group>
	);
	return app;
}

export default LastNameFormGroupControl;
