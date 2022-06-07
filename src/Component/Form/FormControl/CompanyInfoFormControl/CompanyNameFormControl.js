import React from "react";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";
import TextFormControl from "../../FormControl/TextFormControl";

function CompanyNameFormControl({
	id = "",
	placeholder = "Business Name",
	required = false,
	disabled = false,
	sessionStorageObjName = "",
}) {
	const onMergeStorageSessionHandler = (value = "") => {
		util.saveToSessionStore(
			sessionStorageObjName,
			constVar.STORAGE_COMPANY_PROP,
			{
				...util.getSessionStorageObj(sessionStorageObjName)[
					`${constVar.STORAGE_COMPANY_PROP}`
				],
				[`${constVar.STORAGE_COMPANY_NAME_PROP}`]: value,
			}
		);
	};

	const onLoadDefaultValueHandler = () => {
		// get information from the first time load
		const defaultCompany =
			util.getSessionStorageObj(sessionStorageObjName)[
				`${constVar.STORAGE_COMPANY_PROP}`
			] || {};

		const name = defaultCompany[`${constVar.STORAGE_COMPANY_NAME_PROP}`] || "";

		return name;
	};

	const app = (
		<TextFormControl
			{...(id && { id: id })}
			required={required}
			disabled={disabled}
			placeholder={placeholder}
			onMergeStorageSession={onMergeStorageSessionHandler}
			onLoadDefaultValue={onLoadDefaultValueHandler}
		/>
	);
	return app;
}

export default CompanyNameFormControl;
