import React from "react";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";
import EmailFormControl from "../UserInfoFormControl/UserEmailFormControl";

function CompanyEmailFormControl({
	id = "",
	className = "",
	placeholder = "Enter your email",
	required = false,
	disabled = false,
	onEmailValidation = () => {},
	storageObjName = "",
}) {
	const onMergeStorageSessionHandler = (email = "") => {
		const isValidEmail = util.isValidEmailFormat(email);

		util.saveToSessionStore(storageObjName, constVar.STORAGE_COMPANY_PROP, {
			...util.getSessionStorageObj(storageObjName)[
				`${constVar.STORAGE_COMPANY_PROP}`
			],
			[`${constVar.STORAGE_COMPANY_EMAIL_PROP}`]: email,
		});

		util.saveToSessionStore(storageObjName, constVar.STORAGE_COMPANY_PROP, {
			...util.getSessionStorageObj(storageObjName)[
				`${constVar.STORAGE_COMPANY_PROP}`
			],
			[`${constVar.STORAGE_COMPANY_EMAIL_VALIDATION}`]: isValidEmail,
		});

		// notify and return that the email has validated
		onEmailValidation(isValidEmail);
	};

	const onLoadDefaultValueHandler = () => {
		// get information from the first time load
		const defaultCompany =
			util.getSessionStorageObj(storageObjName)[
				`${constVar.STORAGE_COMPANY_PROP}`
			] || {};

		const name = defaultCompany[`${constVar.STORAGE_COMPANY_NAME_PROP}`] || "";

		return name;
	};

	const app = (
		<EmailFormControl
			{...(id && { id: id })}
			required={required}
			className={className}
			placeholder={placeholder}
			disabled={disabled}
			onEmailValidation={onEmailValidationHanlder}
			onMergeStorageSession={onMergeStorageSessionHandler}
			onLoadDefaultValue={onLoadDefaultValueHandler}
		/>
	);
	return app;
}

export default CompanyEmailFormControl;
