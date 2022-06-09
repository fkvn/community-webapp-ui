import React from "react";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";
import GoogleAutoComplete from "../../../AutoComplete/GoogleAutoComplete";

function CompanyAddressFormControl({
	id = "",
	placeholder = "Where are you from",
	required = false,
	storageObjName = "",
	onAddressValidation = () => {},
}) {
	const onMergeStorageSessionHandler = (description = "", placeid = "") => {
		util.saveToSessionStore(storageObjName, constVar.STORAGE_COMPANY_PROP, {
			...util.getSessionStorageObj(storageObjName)[
				`${constVar.STORAGE_COMPANY_PROP}`
			],
			[`${constVar.STORAGE_ADDRESS_PROP}`]: {
				description: description,
				...(placeid && { placeid: placeid }),
			},
		});
	};

	const onLoadDefaultValueHandler = () => {
		// get information from the first time load
		const defaultCompany =
			util.getSessionStorageObj(storageObjName)[
				`${constVar.STORAGE_COMPANY_PROP}`
			] || {};

		const address = defaultCompany[`${constVar.STORAGE_ADDRESS_PROP}`] || {};

		return address;
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

export default CompanyAddressFormControl;
