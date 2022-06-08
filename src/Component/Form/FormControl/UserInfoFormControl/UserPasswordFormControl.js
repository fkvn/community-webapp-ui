import React from "react";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";
import PasswordFormControl from "../PasswordFormControl";

function UserPasswordFormControl({
	id = "",
	className = "",
	placeholder = "",
	required = false,
	disabled = false,
	onPasswordValidation = () => {},
	sessionStorageObjName = "",
}) {
	const onMergeStorageSessionHandler = (
		password = "",
		isValidPassword = false
	) => {
		util.saveToSessionStore(
			sessionStorageObjName,
			constVar.STORAGE_PASSWORD_PROP,
			password
		);

		util.saveToSessionStore(
			sessionStorageObjName,
			constVar.STORAGE_PASSWORD_VALIDATION,
			isValidPassword
		);
	};

	const onLoadDefaultValueHandler = () => {
		return (
			util.getSessionStorageObj(sessionStorageObjName)[
				`${constVar.STORAGE_PASSWORD_PROP}`
			] || ""
		);
	};

	const app = (
		<PasswordFormControl
			{...(id && { id: id })}
			{...(placeholder && { placeholder: placeholder })}
			className={className}
			required={required}
			disabled={disabled}
			onPasswordValidation={onPasswordValidation}
			onMergeStorageSession={onMergeStorageSessionHandler}
			onLoadDefaultValue={onLoadDefaultValueHandler}
		/>
	);
	return app;
}

export default UserPasswordFormControl;
