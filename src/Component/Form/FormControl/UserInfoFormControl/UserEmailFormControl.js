import React from "react";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";
import EmailFormControl from "../EmailFormControl";

function UserEmailFormControl({
	id = "",
	className = "",
	placeholder = "",
	required = false,
	disabled = false,
	onEmailValidation = () => {},
	sessionStorageObjName = "",
}) {
	const onMergeStorageSessionHandler = (email = "", isValidEmail = true) => {
		util.saveToSessionStore(
			sessionStorageObjName,
			constVar.STORAGE_EMAIL_VALIDATION,
			isValidEmail
		);

		util.saveToSessionStore(
			sessionStorageObjName,
			constVar.STORAGE_EMAIL_PROP,
			email
		);
	};

	const onLoadDefaultValueHandler = () => {
		return (
			util.getSessionStorageObj(sessionStorageObjName)[
				`${constVar.STORAGE_EMAIL_PROP}`
			] || ""
		);
	};

	const app = (
		<EmailFormControl
			{...(id && { id: id })}
			{...(placeholder && { placeholder: placeholder })}
			className={className}
			required={required}
			disabled={disabled}
			onEmailValidation={onEmailValidation}
			onMergeStorageSession={onMergeStorageSessionHandler}
			onLoadDefaultValue={onLoadDefaultValueHandler}
		/>
	);
	return app;
}

export default UserEmailFormControl;
