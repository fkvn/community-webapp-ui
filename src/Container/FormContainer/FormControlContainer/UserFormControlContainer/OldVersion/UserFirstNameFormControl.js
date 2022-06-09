import React from "react";
import TextFormControl from "../../../../../Component/Form/FormControl/TextFormControl";
import * as constVar from "../../../../../Util/ConstVar";
import * as util from "../../../../../Util/Util";

//  This is old version that not integrated with Redux
function UserFirstNameFormControl(props) {
	const {
		id = "",
		placeholder = "First Name",
		className = "",
		required = false,
		disabled = false,
		sessionStorageObjName = "",
	} = props;

	// const onMergeStorageSessionHandler = (value = "") => {
	// 	util.saveToSessionStore(
	// 		sessionStorageObjName,
	// 		constVar.STORAGE_FIRSTNAME_PROP,
	// 		value
	// 	);
	// };

	// const onLoadDefaultValueHandler = () => {
	// 	return (
	// 		util.getSessionStorageObj(sessionStorageObjName)[
	// 			`${constVar.STORAGE_FIRSTNAME_PROP}`
	// 		] || ""
	// 	);
	// };

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
