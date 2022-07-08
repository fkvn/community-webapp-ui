import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";
import TextFormControl from "../TextFormControl";

//  This is old version that not integrated with Redux
function UserLastNameFormControl(props) {
	const {
		id = "",
		placeholder = "Last Name",
		className = "",
		required = false,
		disabled = false,
		storageObjName = "",
	} = props;

	const onMergeStorageHandler = (value = "") => {
		util.saveToSessionStore(storageObjName, constVar.LASTNAME_PROP, value);
	};

	const onLoadDefaultValueHandler = () => {
		return (
			util.getSessionStorageObj(storageObjName)[`${constVar.LASTNAME_PROP}`] ||
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

export default UserLastNameFormControl;
