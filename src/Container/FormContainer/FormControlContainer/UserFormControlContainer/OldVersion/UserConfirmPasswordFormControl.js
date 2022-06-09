import React from "react";
import * as constVar from "../../../../../Util/ConstVar";
import * as util from "../../../../../Util/Util";
import ConfirmPasswordFormControl from "../ConfirmPasswordFormControl";

//  This is old version that not integrated with Redux
function UserConfirmPasswordFormControl({
	id = "",
	className = "",
	placeholder = "",
	required = false,
	disabled = false,
	passwordChanged = false,
	onConfirmPasswordValidation = () => {},
	sessionStorageObjName = "",
}) {
	const onMergeStorageSessionHandler = (isPasswordMatch = false) => {
		util.saveToSessionStore(
			sessionStorageObjName,
			constVar.STORAGE_CONFIRM_PASSWORD_VALIDATION,
			isPasswordMatch
		);
	};

	const onGetCurrentPassword = () => {
		return (
			util.getSessionStorageObj(sessionStorageObjName)[
				`${constVar.STORAGE_PASSWORD_PROP}`
			] || ""
		);
	};

	const app = (
		<ConfirmPasswordFormControl
			{...(id && { id: id })}
			{...(placeholder && { placeholder: placeholder })}
			className={className}
			required={required}
			disabled={disabled}
			passwordChanged={passwordChanged}
			onConfirmPasswordValidation={onConfirmPasswordValidation}
			onMergeStorageSession={onMergeStorageSessionHandler}
			onGetCurrentPassword={onGetCurrentPassword}
		/>
	);
	return app;
}

export default UserConfirmPasswordFormControl;
