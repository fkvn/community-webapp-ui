import { useSelector } from "react-redux";
import FormControlControlled from "../../../../Component/Form/FormControl/FormControlControlled";
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
		storageObjName = constVar.THAINOW_USER_SIGN_UP_OBJ,
	} = props;

	const username = useSelector(
		(state) =>
			state.thainowReducer[`${storageObjName}`]?.[
				`${constVar.USERNAME_PROP}`
			] || ""
	);

	const getSessionUsername = () => {
		return (
			util.getSessionStorageObj(storageObjName)[`${constVar.USERNAME_PROP}`] ||
			""
		);
	};

	const updateReduxStoreUsername = (name = "") => {
		dispatchPromise.patchSignupUserInfo({
			[`${constVar.USERNAME_PROP}`]: name,
		});
	};

	const updateSessionUsername = (name = "") => {
		util.saveToSessionStore(storageObjName, constVar.USERNAME_PROP, name);
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
		<FormControlControlled
			{...(id && { id: id })}
			value={username}
			type="search"
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
