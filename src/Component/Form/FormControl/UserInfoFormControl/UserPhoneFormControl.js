import React from "react";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";
import PhoneFormControl from "../PhoneFormControl";

function UserPhoneFormControl({
	id = "",
	className = "",
	required = false,
	disabled = false,
	onPhoneValidation = () => {},
	sessionStorageObjName = "",
}) {
	const onMergeStorageSessionHandler = (
		formattedPhone = "",
		isValidPhone = true
	) => {
		// update storage
		util.saveToSessionStore(
			sessionStorageObjName,
			constVar.STORAGE_PHONE_PROP,
			formattedPhone
		);

		util.saveToSessionStore(
			sessionStorageObjName,
			constVar.STORAGE_PHONE_VALIDATION,
			isValidPhone
		);
	};

	const onLoadDefaultValueHandler = () => {
		return (
			util.getSessionStorageObj(sessionStorageObjName)[
				`${constVar.STORAGE_PHONE_PROP}`
			] || ""
		);
	};

	const app = (
		<PhoneFormControl
			{...(id && { id: id })}
			className={className}
			required={required}
			disabled={disabled}
			onPhoneValidation={onPhoneValidation}
			onMergeStorageSession={onMergeStorageSessionHandler}
			onLoadDefaultValue={onLoadDefaultValueHandler}
		/>
	);
	return app;
}

export default UserPhoneFormControl;
