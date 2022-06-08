import React from "react";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";
import GoogleAutoComplete from "../../../AutoComplete/GoogleAutoComplete";

function UserAddressFormControl({
	id = "",
	placeholder = "Where are you from",
	required = false,
	sessionStorageObjName = "",
	onAddressValidation = () => {},
}) {
	const onMergeStorageSessionHandler = (description = "", placeid = "") => {
		util.saveToSessionStore(
			sessionStorageObjName,
			constVar.STORAGE_ADDRESS_PROP,
			{
				description: description,
				...(placeid && { placeid: placeid }),
			}
		);
	};

	const onLoadDefaultValueHandler = () => {
		return (
			util.getSessionStorageObj(sessionStorageObjName)[
				`${constVar.STORAGE_ADDRESS_PROP}`
			] || {}
		);
	};

	const app = (
		<GoogleAutoComplete
			{...(id && { id: id })}
			{...(placeholder && { placeholder: placeholder })}
			required={required}
			onAddressValidation={onAddressValidation}
			onMergeStorageSession={onMergeStorageSessionHandler}
			onLoadDefaultValue={onLoadDefaultValueHandler}
		/>
	);
	return app;
}

export default UserAddressFormControl;
