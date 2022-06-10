import { useSelector } from "react-redux";
import PasswordFormControl from "../../../../Component/Form/FormControl/PasswordFormControl";
import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";

function UserPasswordFormControlContainer({
	id = "",
	className = "",
	placeholder = "",
	required = false,
	disabled = false,
	onPasswordValidation = () => {},
	storageObjName = "",
}) {
	const [password, isValidPassword] = useSelector((state) => [
		state.thainowReducer[`${storageObjName}`][
			`${constVar.STORAGE_PASSWORD_PROP}`
		] || "",
		state.thainowReducer[`${storageObjName}`][
			`${constVar.STORAGE_PASSWORD_VALIDATION}`
		] || false,
	]);

	const getSessionPassword = () => {
		return (
			util.getSessionStorageObj(storageObjName)[
				`${constVar.STORAGE_PASSWORD_PROP}`
			] || ""
		);
	};

	const updateReduxStorePassword = (password = "", isValidPassword = false) => {
		dispatchPromise.patchSignupClassicInfo({
			[`${constVar.STORAGE_PASSWORD_PROP}`]: password,
			[`${constVar.STORAGE_PASSWORD_VALIDATION}`]: isValidPassword,
		});
	};

	const updateSessionPassword = (password = "") => {
		util.saveToSessionStore(
			storageObjName,
			constVar.STORAGE_PASSWORD_PROP,
			password
		);
	};

	const onMergeStorageHandler = (password = "", isValidPassword = false) => {
		// update store
		updateReduxStorePassword(password, isValidPassword);

		// update storage
		updateSessionPassword(password);

		// validate password
		onPasswordValidation(isValidPassword);
	};

	const onLoadDefaultValueHandler = () => {
		// get information from the first time load
		const defaultPassword = getSessionPassword();

		if (password !== defaultPassword) {
			updateReduxStorePassword(defaultPassword);
		}

		// validate password
		onPasswordValidation(isValidPassword);
	};

	const app = (
		<PasswordFormControl
			{...(id && { id: id })}
			password={password}
			{...(placeholder && { placeholder: placeholder })}
			className={className}
			required={required}
			disabled={disabled}
			onMergeStorage={onMergeStorageHandler}
			onLoadDefaultValue={onLoadDefaultValueHandler}
		/>
	);
	return app;
}

export default UserPasswordFormControlContainer;
