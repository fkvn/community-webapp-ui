import { useSelector } from "react-redux";
import TextFormControl from "../../../../Component/Form/FormControl/TextFormControl";
import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";

function UserUsernameFormControlContainer(props) {
	const {
		id = "",
		placeholder = "Preferred Name",
		className = "",
		required = false,
		disabled = false,
		storageObjName = "",
	} = props;

	const username = useSelector(
		(state) =>
			state.thainowReducer[`${storageObjName}`][
				`${constVar.STORAGE_USERNAME_PROP}`
			] || ""
	);

	const getSessionUsername = () => {
		return (
			util.getSessionStorageObj(storageObjName)[
				`${constVar.STORAGE_USERNAME_PROP}`
			] || ""
		);
	};

	const updateReduxStoreUsername = (name = "") => {
		dispatchPromise.patchSignupClassicInfo({
			[`${constVar.STORAGE_USERNAME_PROP}`]: name,
		});
	};

	const updateSessionUsername = (name = "") => {
		util.saveToSessionStore(
			storageObjName,
			constVar.STORAGE_USERNAME_PROP,
			name
		);
	};

	const onMergeStorageHandler = (value = "") => {
		// update store
		updateReduxStoreUsername(value);

		// save progress
		updateSessionUsername(value);
	};

	const onLoadDefaultValueHandler = () => {
		// get information from the first time load
		const defaultUsername = getSessionUsername();

		if (username !== defaultUsername) {
			updateReduxStoreUsername(defaultUsername);
		}
	};

	const app = (
		<TextFormControl
			{...(id && { id: id })}
			value={username}
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

export default UserUsernameFormControlContainer;
