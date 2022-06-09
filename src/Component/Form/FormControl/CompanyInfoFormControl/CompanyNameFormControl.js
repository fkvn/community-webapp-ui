import React from "react";
import { useSelector } from "react-redux";
import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
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
	const companyInfo = useSelector(
		(state) =>
			state.thainowReducer[`${sessionStorageObjName}`][
				`${constVar.STORAGE_COMPANY_PROP}`
			] || {}
	);

	const onMergeStorageSessionHandler = (value = "") => {
		// update state
		dispatchPromise.patchBusinessSignupInfo({
			[`${constVar.STORAGE_COMPANY_PROP}`]: {
				...companyInfo,
				[`${constVar.STORAGE_COMPANY_NAME_PROP}`]: value,
			},
		});

		// save progress
		const storageCompany =
			util.getSessionStorageObj(sessionStorageObjName)[
				`${constVar.STORAGE_COMPANY_PROP}`
			] || {};

		util.saveToSessionStore(
			sessionStorageObjName,
			constVar.STORAGE_COMPANY_PROP,
			{
				...storageCompany,
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

		if (companyInfo[`${constVar.STORAGE_COMPANY_NAME_PROP}`] !== name) {
			dispatchPromise.patchBusinessSignupInfo({
				[`${constVar.STORAGE_COMPANY_PROP}`]: {
					...companyInfo,
					[`${constVar.STORAGE_COMPANY_NAME_PROP}`]: name,
				},
			});
		}
	};

	const app = (
		<TextFormControl
			{...(id && { id: id })}
			value={companyInfo[`${constVar.STORAGE_COMPANY_NAME_PROP}`]}
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
