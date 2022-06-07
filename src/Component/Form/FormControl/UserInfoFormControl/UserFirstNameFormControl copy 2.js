import React from "react";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";
import TextFormControl from "../TextFormControl";

function UserFirstNameFormControl(props) {
	const {
		id = "",
		placeholder = "",
		className = "",
		required = false,
		disabled = false,
		sessionStorageObjName = "",
	} = props;

	const onMergeStorageSessionHandler = (value = "") => {
		util.saveToSessionStore(
			sessionStorageObjName,
			constVar.STORAGE_FIRSTNAME_PROP,
			value
		);
	};

	const onLoadDefaultValueHandler = () => {
		return (
			util.getSessionStorageObj(sessionStorageObjName)[
				`${constVar.STORAGE_FIRSTNAME_PROP}`
			] || ""
		);
	};

	const app = (
		<TextFormControl
			{...(id && { id: id })}
			className={className}
			placeholder={placeholder}
			required={required}
			disabled={disabled}
			onMergeStorageSession={onMergeStorageSessionHandler}
			onLoadDefaultValue={onLoadDefaultValueHandler}
		/>
	);
	return app;
}

export default UserFirstNameFormControl;
