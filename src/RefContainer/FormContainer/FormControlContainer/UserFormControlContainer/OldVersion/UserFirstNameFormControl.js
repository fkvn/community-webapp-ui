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
		storageObjName = "",
	} = props;

	// const onMergeStorageHandler = (value = "") => {
	// 	util.saveToSessionStore(
	// 		storageObjName,
	// 		constVar.FIRSTNAME_PROP,
	// 		value
	// 	);
	// };

	// const onLoadDefaultValueHandler = () => {
	// 	return (
	// 		util.getSessionStorageObj(storageObjName)[
	// 			`${constVar.FIRSTNAME_PROP}`
	// 		] || ""
	// 	);
	// };

	const onMergeStorageHandler = (value = "") => {
		util.saveToSessionStore(storageObjName, constVar.FIRSTNAME_PROP, value);
	};

	const onLoadDefaultValueHandler = () => {
		return (
			util.getSessionStorageObj(storageObjName)[`${constVar.FIRSTNAME_PROP}`] ||
			""
		);
	};

	const app = (
		<TextFormControl
			{...(id && { id: id })}
			className={className}
			placeholder={placeholder}
			required={required}
			disabled={disabled}
			onMergeStorage={onMergeStorageHandler}
			onLoadDefaultValue={onLoadDefaultValueHandler}
		/>
	);
	return app;
}

export default UserFirstNameFormControl;
