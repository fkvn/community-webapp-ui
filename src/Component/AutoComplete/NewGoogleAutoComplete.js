import React from "react";
import * as constVar from "../../Util/ConstVar";
import DropDownFormControl from "../Form/FormControl/DropDownFormControl";

function NewGoogleAutoComplete({
	id = "",
	required = false,
	placeholder = "Please enter address",
	sessionStorageObjName = "",
	sessionStoragePropName = constVar.STORAGE_ADDRESS_PROP,
}) {
	const addressRef = React.createRef("");

	const predictions = [];

	const app = (
		<DropDownFormControl
			{...(id && { id: id })}
			required={required}
			placeholder={placeholder}
			dropdownItems={predictions || []}
		/>
	);

	return app;
}

export default NewGoogleAutoComplete;
