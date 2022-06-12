import { useEffect } from "react";
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
	const password = useSelector(
		(state) =>
			state.thainowReducer[`${storageObjName}`][
				`${constVar.STORAGE_PASSWORD_PROP}`
			] || ""
	);

	const getSessionPassword = () => {
		return (
			util.getSessionStorageObj(storageObjName)[
				`${constVar.STORAGE_PASSWORD_PROP}`
			] || ""
		);
	};

	const updateReduxStorePassword = (password = "", isValidPassword = false) => {
		dispatchPromise.patchSignupUserInfo({
			[`${constVar.STORAGE_PASSWORD_PROP}`]: password,
			[`${constVar.STORAGE_PASSWORD_VALIDATION}`]: isValidPassword,
		});
	};

	const updateSessionPassword = (password = "", isValidPassword = false) => {
		util.saveToSessionStore(
			storageObjName,
			constVar.STORAGE_PASSWORD_PROP,
			password
		);

		util.saveToSessionStore(
			storageObjName,
			constVar.STORAGE_PASSWORD_VALIDATION,
			isValidPassword
		);
	};

	const onMergeStorageHandler = (password = "") => {
		// validate password
		const isValidPassword = onPasswordValidation(password) || false;

		// update store
		updateReduxStorePassword(password, isValidPassword);

		// update storage
		updateSessionPassword(password, isValidPassword);
	};

	const onLoadDefaultValueHandler = () => {
		// get information from the first time load
		const defaultPassword = getSessionPassword();

		// validate password
		const isValidPassword = onPasswordValidation(defaultPassword) || false;

		if (password !== defaultPassword) {
			updateReduxStorePassword(defaultPassword, isValidPassword);
		}
	};

	//this is to check when the field is filled by redux store value changed
	useEffect(() => {
		// validate password
		const isValidPassword = onPasswordValidation(password) || false;

		const isValidStorePassword =
			dispatchPromise.getState()[`${storageObjName}`][
				`${constVar.STORAGE_PASSWORD_VALIDATION}`
			] || isValidPassword;

		if (isValidStorePassword !== isValidPassword) {
			dispatchPromise.patchSignupUserInfo({
				[`${constVar.STORAGE_PASSWORD_VALIDATION}`]: isValidPassword,
			});
		}
	}, [password, storageObjName, onPasswordValidation]);

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
